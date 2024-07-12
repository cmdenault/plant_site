// This is the component containing the entire home page 


import { useLocation } from 'react-router-dom';

import { Plant as PlantModel } from '../models/Plant';
import PlantDetails from '../components/PlantDetails';

// import components we want
//import ChallengeList from "../components/ChallengeList";


export default function Details() {

    // hooks and necessary functions
    //const { id : articleId } = useParams(); // Extract id field from route parameter
    const location = useLocation();
    const plant : PlantModel = location.state?.plant; // Access plant object from state


    return (
        <>

            <PlantDetails plant={plant}/>

            {/* 
            <Link to={`/challenges/${challenge.id}`}>
                <div>
                    a card for plant
                </div>
            </Link>
            */}
            
        </>
        
    )
}