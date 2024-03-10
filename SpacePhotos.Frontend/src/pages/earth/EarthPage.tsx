import { useMemo, useState } from "react";
import { PageTitle } from "../../components/PageTitle";
import { Loading } from "../../components/shared/Loading";
import { usePageTitle } from "../../helpers/pageTitleHelper";
import { useEarthPhotos } from "../../hooks/photos";
import Lightbox from "yet-another-react-lightbox";
import { Captions } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { ImageThumbnailCard } from "../../components/shared/ImageThumbnailCard";

export function EarthPage() {
    usePageTitle("Earth");

    const [viewer, setViewer] = useState({ open: false, index: 0 });

    const { data: photos, isFetching: photosFetching } = useEarthPhotos();

    const slides = useMemo(() => {
        return photos?.map(photo => ({
            src: photo.url,
            hdSrc: photo.hdurl,
            description: <span>{new Date(photo.date).toLocaleString()} <br /> Lat: {photo.lat} Lon: {photo.lon}</span>,
            title: <span>{photo.caption}</span>
        }));
    }, [photos]);

    return (
        <>
            <PageTitle title="Earth pictures" />
            <Loading loading={photosFetching} gray={false}>
                <div className="d-flex flex-row flex-wrap justify-content-center gap-2">
                    {
                        photos?.map((photo, index) => (
                            <ImageThumbnailCard key={photo.date} className="col-12 col-md-5 col-lg-3 d-flex flex-column justify-content-start">
                                <p className="m-0">
                                    <span>
                                        {new Date(photo.date).toLocaleString()}
                                        <br />
                                        Lat: {photo.lat} Lon: {photo.lon}
                                    </span>
                                </p>

                                <img src={photo.url}
                                    alt=""
                                    role="presentation"
                                    className="pointer"
                                    onClick={() => setViewer({ open: true, index })}
                                />

                                <a href={photo.hdurl}
                                    download
                                    target="_blank">
                                    <i className="fa-solid fa-download me-2"></i>
                                    Download in full resolution
                                </a>
                            </ImageThumbnailCard>
                        ))
                    }

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
                            finite: false
                        }}
                    />
                </div>
            </Loading>
        </>
    );
}