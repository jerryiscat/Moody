import React, { useState, useEffect } from 'react';
import Home from './home';
import Profile from './Profile';
import Login from './Login';
import Registration from './Registration';
import {NavHead} from './Nav';
import {Footer} from './Footer';
import Mood from './Mood';
import Graph from './Graph';
import InfoEdition from './InfoEdition';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MusicPage from './music/MusicPage';
import MusicPlayList from './music/MusicPlayList';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';


export default function App() {
    const [name, updateName] = useState("");
    const [email, updateEmail] = useState("");
    const [image, updateImage] = useState('img/female-1.png');
    const [gender, updateG] = useState("");
    const [sentence, setSent] = useState("");
    const [age, setAge] = useState();
    const [currentUser, setCurrentUser] = useState("");

    //function updateData(emails) {
        //updateEmail(emails);
    //}

    function editProfile(name1, email1, image1, gender1, sentence1) {
        updateName(name1);
        updateEmail(email1);
        updateImage(image1);
        updateG(gender1);
        setSent(sentence1);
    }

    function updateLogin(email2, name2) {
        updateName(email2);
        updateName(name2);
    }

    function newRegister(name3, email3, gender3, sentence3, age3) {
        updateName(name3);
        updateEmail(email3);
        updateG(gender3);
        setSent(sentence3);
        setAge(age3);
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser) {
                console.log("sign in as", firebaseUser.displayName);
                console.log(firebaseUser);
                firebaseUser.userName = firebaseUser.displayName;
                setCurrentUser(firebaseUser);
            }
            else {
                console.log("sign out");
                setCurrentUser("");
            }
        });

        signOut(auth).catch(err => console.log(err));
    

    }, [])

    // music
    const [musictype,setMusictype] = useState("rock");

    return (
        <div>
        <NavHead currentUser={currentUser}/>
        
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mood" element={<Mood />} />
                    <Route path="/music" element={<MusicPage />} />
                        <Route path="/music-play" element={<MusicPlayList />} />
                    <Route path="/profile" element={<Profile Name={name} Email={email} Img={image} Gender={gender} bio={sentence} age={age} currentUser={currentUser}/>} />
                    <Route path="/login" element={<Login update={updateLogin} currentUser={currentUser}/>} />
                        <Route path="/register" element={<Registration newR={newRegister} currentUser={currentUser}/>} />

                        <Route path="/info-edition" element={<InfoEdition edit={editProfile}/>} />
                    <Route path="/graph" element={<Graph />} />
                </Routes>
        </BrowserRouter>
        <Footer />     
        </div>
    );
}