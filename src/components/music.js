import React, {useState} from 'react';
import PlayMusic from './music-play';
import MUSIC_SAMPLE from '../data/music-sample.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import MOODS from '../data/MOODS.json'


    const typeMusicObj = {};
    for(const musicObj of MUSIC_SAMPLE) {
        const typeList = musicObj.musicType;
        const audioLink = musicObj.audioLink;
        for(const type of typeList) {
            if(typeMusicObj.hasOwnProperty(type)) {
                typeMusicObj[type].push(audioLink);
            }
            else {
                typeMusicObj[type] = [];
                typeMusicObj[type].push(audioLink);
            }
        }
    };


const recommandMusicSample = [{mood:"Repulse", color:"#E8988E", playPageLink:"/#", musicType:["quick","sad"]},
{mood:"Fuming", color:"#EB8075", playPageLink:"/#", musicType:["slow","sad"]},
{mood:"Stressed", color:"#E55A90", playPageLink:"/#", musicType:["quick","sad","acoustic"]}]


// filter today's recommand music const recommandMusicSample = musicSample.filter()
const musicSample = [{mood:"Repulse", color:"#E8988E", playPageLink:"/#", musicType:["quick","sad"]},
{mood:"Fuming", color:"#EB8075", playPageLink:"/#", musicType:["slow","sad"]},
{mood:"Stressed", color:"#E55A90", playPageLink:"/#", musicType:["quick","sad","acoustic"]},
{mood:"Repulse", color:"#E8988E", playPageLink:"/#", musicType:["quick","sad"]},
{mood:"Fuming", color:"#EB8075", playPageLink:"/#", musicType:["slow","sad"]},
{mood:"Stressed", color:"#E55A90", playPageLink:"/#", musicType:["quick","sad","acoustic"]}]

export function RecommandMusicSection() {


    const musicList = recommandMusicSample.map((obj) => {
        return (
            <div className="col">
                <div className="square-md " style={{backgroundColor: obj.color}}>
                    <div className="p-5" >
                        <a href="{obj.playPageLink}" className="style-bt">{obj.mood}</a>
                    </div>
                </div>
            </div>
        )
    });

    return(
        <div className="recommand-music container">
                <h2 className="primary-dark-color">Get Your Mood Music</h2>
                <div className="container text-center dash-border-light-bg">
                    <div className="row my-3 px-2"> 
                        <div className="col-lg-3 col-md-5 col-sm-5 my-1"><h3>Today's Mood</h3></div>
                        <div className="col"></div>
                        <div className="col-lg-3 col-md-5 col-sm-5 my-1"><button className="primary-bt"><a href="/mood">Place Your Mood</a></button></div>
                    </div>
                    
                    <div className="container">
                        <div className="row d-flex justify-content-between">
                            {musicList}
                        </div>
                    </div>
                </div>
            </div> 
    )
}


export function StyleMusicSection() {

    const [type, updateType] = useState('');


    const typeChange = (event) => {
        const type = event.target.value;
        updateType(type);
    }

    const filter = () => {
        let result = null;
        if (type != null) {
        result = typeList.filter((key) => key.type.includes(type));
        return result;
        }
    };

    const typeList = [];
    for(const type in typeMusicObj) {
        const typeMusicList = [];
        for (const obj of MUSIC_SAMPLE) {
            const typeList = obj.musicType;
            if(type in typeList) {
                typeMusicList.push(obj);
            }
        }
        
        const typeName = type[0].toUpperCase() + type.substring(1);
        typeList.push(
            <div className="col">
                <div className="row d-flex justify-content-center">
                    <div className="card p-3 square-sm mx-3 ">
                        <div>
                            <a className="heading-style primary-dark-color" href="/music-play">{typeName}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
            
    

        return(
            <div className="container style-music">
                    <div className="container mt-5 mb-3">
                        <h2 className="primary-dark-color">Choose Style</h2>
                        <select className="choice" id="type-choice" value={type} onChange={typeChange}>
                        <option className="value" value={filter()}>rock</option> 
                            <option className="value" value={filter()}>quick</option> 
                            <option className="value" value={filter()}>sad</option> 
                            <option className="value" value={filter()}>slow</option> 
                            <option className="value" value={filter()}>piano</option>
                            <option className="value" value={filter()}>alternative</option>
                            <option className="value" value={filter()}>indie rock</option>
                        </select>

                        <div className="row text-center">
                            {typeList}
                        </div>
                    </div>
                </div>
        );
    
}

export default function Music() {
    return (
        <div>
            <header>
                <div className="container dash-border-light-bg">
                    <h1 className="primary-dark-color">Music With Your Mood</h1>
                </div>
            </header>

            <RecommandMusicSection />
            <StyleMusicSection />
        </div>
    )
}