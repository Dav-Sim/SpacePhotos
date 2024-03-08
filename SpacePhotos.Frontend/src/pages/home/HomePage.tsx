import { Loading } from "../../components/shared/Loading";
import { usePageTitle } from "../../helpers/pageTitleHelper";
import { usePhotoOfTheDay } from "../../hooks/photos";
import { PageTitle } from "../../components/PageTitle";
import Lightbox from "yet-another-react-lightbox";
import { Captions } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useMemo, useState } from "react";

export function HomePage() {
    usePageTitle("Home");

    //setter can be used later to select eg month and see older pictures...
    const [date, setDate] = useState(new Date());
    const [todayPhotoLoaded, setTodayPhotoLoaded] = useState(false);
    const [viewer, setViewer] = useState({ open: false, index: 0 });

    const dateFromTo = useMemo(() => {
        const today = new Date();
        const from = new Date(date.getFullYear(), date.getMonth(), 1);
        const to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (from > today) from.setDate(today.getDate());
        if (to > today) to.setDate(today.getDate());
        return { from, to };
    }, [date]);

    const { data: currentDayPhotos, isFetching: currentDayPhotosFetching } = usePhotoOfTheDay();
    const { data: monthPhotos, isFetching: monthPhotosFetching } = usePhotoOfTheDay(dateFromTo.from, dateFromTo.to);
    const photoOfTheDay = useMemo(() => currentDayPhotos?.[0], [currentDayPhotos]);

    const slides = useMemo(() => {
        return monthPhotos
            ?.map(photo => ({
                src: photo.mediaType === "image" ? photo.url : photo.videoThumbnail ?? "",
                title: photo.title,
                description: photo.explanation
            })) ?? [];
    }, [monthPhotos]);

    return (
        <>
            <PageTitle title="Astronomy Picture of the Day" />
            <Loading loading={currentDayPhotosFetching} gray={false}>
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                    {
                        !!photoOfTheDay &&
                        <>
                            <p className="m-0">{photoOfTheDay.title}</p>

                            <img className="img-fluid"
                                src={photoOfTheDay.url}
                                alt="awesome space"
                                role="presentation"
                                onLoad={() => setTodayPhotoLoaded(true)}
                            />
                            {
                                todayPhotoLoaded &&
                                <>
                                    <p>{photoOfTheDay.explanation}</p>
                                    <p>Copyright {photoOfTheDay.copyright}</p>
                                </>
                            }

                            <a href={photoOfTheDay.hdurl}
                                download
                                target="_blank">
                                <i className="fa-solid fa-download me-2"></i>
                                Download in full resolution
                            </a>
                        </>
                    }

                </div>
            </Loading>

            <PageTitle title="Old Pictures of the Day" className="mt-4" />
            <Loading loading={monthPhotosFetching} gray={false}>
                <div className="d-flex flex-row flex-wrap justify-content-center gap-2">
                    {
                        monthPhotos?.map((photo, index) =>
                            <div key={photo.date} className="col-12 col-md-5 col-lg-3 d-flex flex-column justify-content-start">
                                <p className="m-0">
                                    {photo.title}
                                </p>
                                {
                                    photo.mediaType === "image" &&
                                    <img src={photo.url}
                                        alt=""
                                        role="presentation"
                                        className="pointer"
                                        onClick={() => setViewer({ open: true, index })}
                                    />
                                }
                                {
                                    photo.mediaType === "video" &&
                                    <iframe title={photo.title}
                                        src={photo.url}>
                                    </iframe>
                                }
                            </div>
                        )
                    }
                </div>
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
                }}
                carousel={{
                    finite: true
                }}
            />
        </>
    );
}
