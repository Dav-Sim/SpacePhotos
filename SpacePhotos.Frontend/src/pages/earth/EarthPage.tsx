import { useMemo, useState } from "react";
import { PageTitle } from "../../components/PageTitle";
import { Loading } from "../../components/shared/Loading";
import { usePageTitle } from "../../helpers/pageTitleHelper";
import { useEarthPhotos } from "../../hooks/photos";
import Lightbox from "yet-another-react-lightbox";
import { Captions, Inline } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export function EarthPage() {
    usePageTitle("Earth");

    const [photoIndex, setPhotoIndex] = useState(0);
    const [open, setOpen] = useState(false);

    const photos = useEarthPhotos();

    const slides = useMemo(() => {
        return photos?.data?.map(photo => ({
            src: photo.url,
            hdSrc: photo.hdurl,
            description: <span>{new Date(photo.date).toLocaleString()} <br /> Lat: {photo.lat} Lon: {photo.lon}</span>,
            title: <span>{photo.caption}</span>
        }));
    }, [photos?.data]);

    return (
        <>
            <PageTitle title="Earth pictures" />
            <Loading loading={photos.isFetching}>
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">

                    <p className="m-0">{slides?.[photoIndex].title}</p>
                    <Lightbox
                        index={photoIndex}
                        slides={slides}
                        plugins={[Inline]}
                        on={{
                            view: ({ index }) => setPhotoIndex(index),
                            click: () => setOpen((old) => !old)
                        }}
                        carousel={{
                            finite: false,
                            preload: 1,
                            padding: 0,
                            spacing: 0,
                            imageFit: "contain"
                        }}
                        animation={{ fade: 300, swipe: 0, zoom: 300 }}
                        inline={{
                            style: {
                                width: "100%",
                                aspectRatio: "1 / .9",
                                margin: "0 auto",
                            },
                        }}
                    />
                    <p className="m-0 text-center">{slides?.[photoIndex].description}</p>
                    {
                        slides?.[photoIndex] &&
                        <a href={slides[photoIndex].hdSrc}
                            download
                            target="_blank">
                            <i className="fa-solid fa-download me-2"></i>
                            Download in full resolution
                        </a>
                    }

                    <Lightbox
                        open={open}
                        plugins={[Captions]}
                        close={() => setOpen(false)}
                        index={photoIndex}
                        slides={slides}
                        on={{ view: ({ index }) => setPhotoIndex(index) }}
                        animation={{ fade: 300, swipe: 0, zoom: 300 }}
                        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                        captions={{
                            descriptionTextAlign: "center",
                        }}
                    />
                </div>
            </Loading>
        </>
    );
}