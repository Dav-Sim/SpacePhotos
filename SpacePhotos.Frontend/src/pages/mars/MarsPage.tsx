import { ImageThumbnailCard } from "../../components/shared/ImageThumbnailCard";
import { usePageTitle } from "../../helpers/pageTitleHelper";
import detailImg from './img/Mars_2020_Rover_detail_sm.png';
import './MarsPage.css';

export function MarsPage() {
    usePageTitle("Mars");

    return (
        <>
            Mars
            Under construction.........
            <ImageThumbnailCard>

                <div className="position-relative">

                    <img src={detailImg}
                        className="img-fluid"
                    />

                    <svg className="w-100 h-100"
                        style={{
                            backgroundColor: "transparent",
                            position: "absolute",
                            top: "0",
                            left: "0",
                            right: "0",
                            bottom: "0"
                        }}>
                        <circle cx={250} cy={440} r={50}
                            stroke="red"
                            strokeOpacity={.5}
                            strokeWidth="1rem"
                            fill="transparent"
                        />
                    </svg>
                </div>

            </ImageThumbnailCard>
        </>
    );
}