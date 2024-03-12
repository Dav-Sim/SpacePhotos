import { Loading } from "../../components/shared/Loading";
import { usePageTitle } from "../../helpers/pageTitleHelper";
import { usePhotoOfTheDay } from "../../hooks/photos";
import { PageTitle } from "../../components/PageTitle";
import Lightbox from "yet-another-react-lightbox";
import { Captions } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useMemo, useState } from "react";
import { ImageThumbnailCard } from "../../components/shared/ImageThumbnailCard";
import { PhotoOfTheDay } from "../../types/photos";

export function PictOfTheDayPage() {
    usePageTitle("Picture of the day");

    const actualMonthStart = useActualMonthStart();
    const [date, setDate] = useState(actualMonthStart);
    const [viewer, setViewer] = useState({ open: false, index: 0 });
    const month = useMonthStartAndEnd(date);

    const { data: currentDayPhotos, isFetching: currentDayPhotosFetching } = usePhotoOfTheDay();
    const { data: monthPhotos, isFetching: monthPhotosFetching } = usePhotoOfTheDay(month.from, month.to);
    const photoOfTheDay = useMemo(() => currentDayPhotos?.[0], [currentDayPhotos]);
    const slides = usePhotoSlides(monthPhotos);

    return (
        <>
            <PageTitle title="Astronomy Picture of the Day" />
            <Loading loading={currentDayPhotosFetching} gray={false}>
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                    <SinglePhoto photo={photoOfTheDay} />
                </div>
            </Loading>

            <PageTitle title="Old Pictures of the Day" className="mt-4" />
            <Loading loading={monthPhotosFetching} gray={false}>
                <MonthSelector actualMonthStart={actualMonthStart}
                    date={date}
                    setDate={setDate}
                    photosFetching={monthPhotosFetching}
                />

                <PhotosThumbnails photos={monthPhotos}
                    onImageClick={(index) => setViewer({ open: true, index })}
                />
            </Loading>

            <Lightbox
                open={viewer.open}
                plugins={[Captions]}
                close={() => setViewer((old) => ({ ...old, open: false }))}
                index={viewer.index}
                slides={slides}
                on={{ view: ({ index }) => setViewer((old) => ({ ...old, index: index })) }}
                animation={{ fade: 300, swipe: 0, zoom: 300 }}
                controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                captions={{
                    descriptionTextAlign: "center",
                    descriptionMaxLines: 100,
                    showToggle: true
                }}
                carousel={{
                    finite: true
                }}
            />
        </>
    );
}

function PhotosThumbnails({
    photos,
    onImageClick
}: Readonly<{
    photos?: PhotoOfTheDay[],
    onImageClick: (index: number) => void
}>) {
    return <div className="d-flex flex-row flex-wrap justify-content-center gap-2"
        style={{ minHeight: "200px" }}>
        {
            photos?.map((photo, index) => <ImageThumbnailCard key={photo.date} className="col-12 col-md-5 col-lg-3 d-flex flex-column justify-content-start">
                <p className="m-0">
                    {photo.title}
                </p>

                <p className="m-0">
                    {new Date(photo.date).toLocaleDateString()}
                </p>

                {
                    photo.mediaType === "image" &&
                    <>
                        <img src={photo.url}
                            alt=""
                            role="presentation"
                            className="pointer"
                            onClick={() => onImageClick(index)} />
                        <a href={photo.hdurl}
                            download
                            target="_blank">
                            <i className="fa-solid fa-download me-2"></i>
                            Download in full resolution
                        </a>
                    </>
                }
                {
                    photo.mediaType === "video" &&
                    <>
                        <img src={photo.videoThumbnail}
                            alt=""
                            role="presentation"
                            className="pointer"
                            onClick={() => onImageClick(index)} />
                        <a href={photo.url}
                            target="_blank">
                            <i className="fa-brands fa-youtube me-2"></i>
                            Play on YouTube
                        </a>
                    </>
                }
            </ImageThumbnailCard>
            )
        }
    </div>;
}

function MonthSelector({
    date,
    setDate,
    photosFetching: monthPhotosFetching,
    actualMonthStart
}: Readonly<{
    date: Date,
    setDate: (date: Date) => void,
    photosFetching: boolean,
    actualMonthStart: Date,
}>) {
    const monthOptions = useMonthOptions(actualMonthStart);

    return (
        <div data-bs-theme="dark" className="col col-md-8 col-lg-6 form-floating mx-auto mb-2">
            <select
                className="form-select"
                id="monthSelect"
                value={date.toISOString().substring(0, 10)}
                onChange={(ev) => setDate(new Date(ev.currentTarget.value))}
                disabled={monthPhotosFetching}
            >
                {monthOptions.map(month => (
                    <option key={month.value} value={month.value}>{month.text}</option>
                ))}
            </select>
            <label htmlFor="monthSelect">Pictures of the day for month</label>
        </div>
    );
}

function SinglePhoto({
    photo
}: Readonly<{
    photo?: PhotoOfTheDay
}>) {
    const [photoLoaded, setPhotoLoaded] = useState(false);

    return (
        !!photo &&
        <>
            <p className="m-0">{photo.title}</p>

            <img className="img-fluid"
                src={photo.url}
                alt="awesome space"
                role="presentation"
                onLoad={() => setPhotoLoaded(true)} />
            {photoLoaded &&
                <>
                    <p>{photo.explanation}</p>
                    <p>Copyright {photo.copyright ?? "none"}</p>
                    {photo.mediaType === "image" &&
                        <a href={photo.hdurl}
                            download
                            target="_blank">
                            <i className="fa-solid fa-download me-2"></i>
                            Download in full resolution
                        </a>}
                </>}
        </>
    );
}

function useActualMonthStart() {
    return useMemo(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1, 12);
    }, []);
}

function useMonthStartAndEnd(date: Date) {
    return useMemo(() => {
        const today = new Date();
        let from = new Date(date.getFullYear(), date.getMonth(), 1, 12);
        let to = new Date(date.getFullYear(), date.getMonth() + 1, 0, 12);

        if (from > today) from = today;
        if (to > today) to = today;

        return { from, to };
    }, [date]);
}

function useMonthOptions(actualMonthStart: Date) {
    return useMemo(() => {
        const from = new Date(2019, 12, 1, 12);
        const options: { text: string, value: string }[] = [];
        while (from < actualMonthStart) {
            from.setMonth(from.getMonth() + 1);
            options.push({
                text: `${from.getFullYear()}/${(from.getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2 })}`,
                value: from.toISOString().substring(0, 10)
            });
        }
        return options.reverse();
    }, [actualMonthStart]);
}

function usePhotoSlides(photos?: PhotoOfTheDay[]) {
    return useMemo(() => {
        return photos
            ?.map(photo => ({
                src: photo.mediaType === "image" ? photo.url : photo.videoThumbnail ?? "",
                title: photo.title,
                description: `Copyright ${photo.copyright ?? "none"}. ${photo.explanation}`
            })) ?? [];
    }, [photos]);
}
