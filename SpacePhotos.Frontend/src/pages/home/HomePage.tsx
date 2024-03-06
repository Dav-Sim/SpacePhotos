import { Loading } from "../../components/shared/Loading";
import { usePageTitle } from "../../helpers/pageTitleHelper";
import { usePhotoOfTheDay } from "../../hooks/photos";
import { PageTitle } from "../../components/PageTitle";
import Lightbox from "yet-another-react-lightbox";
import { Captions } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useState } from "react";

export function HomePage() {
    usePageTitle("Home");

    const [open, setOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const photoOfTheDay = usePhotoOfTheDay();

    return (
        <>
            <PageTitle title="Astronomy Picture of the Day" />
            <Loading loading={photoOfTheDay.isFetching}>
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                    {
                        photoOfTheDay?.data &&
                        <>
                            <p className="m-0">{photoOfTheDay.data.title}</p>

                            <img className="img-fluid"
                                src={photoOfTheDay.data.url}
                                alt="awesome space"
                                onClick={() => setOpen(true)}
                                role="presentation"
                                onLoad={() => setImageLoaded(true)}
                            />
                            {
                                imageLoaded &&
                                <p>{photoOfTheDay.data.explanation}</p>
                            }

                            <a href={photoOfTheDay.data.hdurl}
                                download
                                target="_blank">
                                <i className="fa-solid fa-download me-2"></i>
                                Download in full resolution
                            </a>

                            <Lightbox
                                open={open}
                                plugins={[Captions]}
                                close={() => setOpen(false)}
                                index={0}
                                slides={[
                                    {
                                        src: photoOfTheDay.data.url,
                                        title: photoOfTheDay.data.title
                                    }
                                ]}
                                on={{ view: () => { } }}
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
                    }

                </div>
            </Loading>
        </>
    );
}