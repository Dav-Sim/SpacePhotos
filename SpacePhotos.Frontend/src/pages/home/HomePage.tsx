import { Loading } from "../../components/shared/Loading";
import { usePageTitle } from "../../helpers/pageTitleHelper";
import { usePhotos } from "../../hooks/photos";

export function HomePage() {
    usePageTitle("Home");

    const photos = usePhotos();

    return (
        <div>
            <h2>Photos</h2>
            <Loading loading={photos.isFetching}>
                {
                    photos?.data?.map(photo => (
                        <img key={photo.id} src={photo.url} alt="wild and wonderful space" />
                    ))
                }
            </Loading>
        </div>
    );
}