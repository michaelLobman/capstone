import Container from 'react-bootstrap/Container'
import ProgressBar from 'react-bootstrap/ProgressBar'

import AdvanceBtn from '../components/AdvanceBtn';
import ProgressPanel from '../components/ProgressPanel';
import ReturnBtn from '../components/ReturnBtn';
import WorkoutAccordion from '../components/WorkoutAccordion';

/* now passing down progressions and setProgressions as props */

function Home({ user, setUser, progressions, setProgressions }){

    const phase = Math.ceil(user.current_week / 4) * 4 / 4

    const renderReturn = user.current_week > 1 && user.current_week < 20 ? (
        <ReturnBtn
                user={user}
                setUser={setUser}
                setProgressions={setProgressions}
            />
        )  : null

    return (
        <Container id='home-container'>
            <h2 id='workout-h2'>Week {user.current_week} Workouts</h2>
            <WorkoutAccordion 
                user={user} 
                progressions={progressions} 
                setProgressions= {setProgressions}
            />
            <AdvanceBtn
                user={user} 
                setUser={setUser} 
                setProgressions={setProgressions}
            />
            {renderReturn}
        </Container>
    )
}

export default Home;