import { useMemo } from "react";
import { Loading } from "../../components/shared/Loading";
import { usePageTitle } from "../../helpers/pageTitleHelper";
import { usePhotoOfTheDay } from "../../hooks/photos";

export function HomePage() {
    usePageTitle("Home");

    const photoOfTheDay = usePhotoOfTheDay();

    const imageName = useMemo(() => {
        if (photoOfTheDay.data?.url) {
            const index = photoOfTheDay.data.url.lastIndexOf("/");
            return photoOfTheDay.data.url.substring(index + 1);
        }
        else return "";
    }, [photoOfTheDay?.data?.url]);

    return (
        <div>
            <h3 className="text-center border-bottom pb-2">Astronomy Picture of the Day</h3>

            <Loading loading={photoOfTheDay.isFetching}>
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                    {
                        photoOfTheDay?.data &&
                        <>
                            <p className="m-0">{photoOfTheDay.data.title}</p>

                            <img className="img-fluid"
                                src={photoOfTheDay.data.url}
                                alt="awesome space image of the day" />

                            <p>{photoOfTheDay.data.explanation}</p>

                            <a href={photoOfTheDay.data.hdurl}
                                download={imageName}
                                target="_blank">
                                <i className="fa-solid fa-download me-2"></i>
                                Download in full resolution
                            </a>
                        </>
                    }
                </div>
            </Loading>
        </div>
    );
}