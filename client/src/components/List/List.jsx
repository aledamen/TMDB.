import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useRef, useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./list.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../../state/movies';
import { useEffect } from 'react';
  
export default function List(props) {
    const user = useSelector((state) => state.login)
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const listRef = useRef();
    const name = props.movies ? 'movies' : 'series'
    const data = props[name]
    const [boolean, setBoolean] = useState(false)

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${220 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 15) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-220 + distance}px)`;
        }
    };
    return (
        <div className="list">
            <span className="listTitle">{name.toUpperCase()}</span>
            <div className="wrapper">
                <ArrowBackIosOutlinedIcon
                    className="sliderArrow left"
                    onClick={() => handleClick("left")}
                    style={{ display: !isMoved && "none" }}
                />
                <div className="container" ref={listRef}>
                    {data && data.map((media, i) => <ListItem key={i} index={i} data={media} name={name}  />)}
                </div>
                <ArrowForwardIosOutlinedIcon
                    className="sliderArrow right"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    )
}