import {useState , useEffect} from "react";
import {Box, Stack , Avatar , Typography} from '@mui/material'
import styles from './ProfileCard.module.css'
import PersonIcon from '@mui/icons-material/Person';
import { CalendarIcon } from "@mui/x-date-pickers";

const ProfileCard = ({handleOverview , overview , handleEdit , edit  , userData}) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setScreenWidth(newWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const date = userData && userData.dob.slice(0, 10);
    return(
        <Box
        className={styles.Box} 
            sx={{
                bgcolor: 'white',
                width: '90%',
                mb: '2rem',
                borderRadius: '10px',
                padding: '2rem 0 0 0',
                display: 'flex',
                flexDirection:'column',
                zIndex: 0
            }}
        >   
            <span style={{
                width: '100%',
                display: 'flex', 
                justifyContent: 'center'
            }}>
            <Avatar 
            alt="User"
            src=""
            sx={{
                width: '10rem',
                height: '10rem'
            }}
            />
        </span>
            <Stack>
                <Typography
                    variant="h4"
                    component='h4'
                    sx={{
                        width: '100%',
                        textAlign: 'center', 
                        mt: '2rem',
                        mb: '1.5rem' ,
                        fontWeight: '650',
                    }}
                    className={styles.Name}
                    >
                        Wouroud El Khaldi
                </Typography>
                <Stack flexDirection={screenWidth > 550 ? 'row': 'column' } justifyContent='center' columnGap={'3rem'} color='#BABABA'>
                    <span style={{
                        display: 'flex',
                        width: screenWidth > 550 ? '' : '100%',
                        justifyContent: 'center',
                        marginBottom: "1rem"
                    }}>
                    <PersonIcon/>
                    <Typography 
                        variant='body1'
                        component='p'
                        >
                         Admin
                    </Typography>
                    </span>
                </Stack>
            </Stack>
                <Stack mb='0px' ml='1rem' flexDirection='row'>
                    <span className={`${styles.Span} ${overview ? styles.ActiveSpan : ''}`} onClick={handleOverview}>
                        Overview
                    </span>
                    <span className={`${styles.Span} ${edit ? styles.ActiveSpan : ''}`} onClick={handleEdit}>
                        Edit
                    </span>
                </Stack>
        </Box>
    )
}
export default ProfileCard ;