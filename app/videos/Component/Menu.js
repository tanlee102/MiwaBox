'use client';

import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { capitalizeWords } from '../helper/capitalize';
import '../css/menu.css';
import { VideoPageContext } from '../Context/VideoPageContext';
import { useRouter } from 'next/navigation';
import { WindowContext } from '@/app/Context/WindowContext';

const Menu = ({data}) => {

    const hzBarRef = useRef(null);
    const [countScroll, setCountScroll] = useState(0);
    const [attachment, setAttachment] = useState(false);
    const [lastPosition, setLastPosition] = useState([0, 0]);

    const leftButtonRef = useRef(null);
    const rightButtonRef = useRef(null);
    const router = useRouter();

    const [selectedItem, setSelectedItem] = useState(null);

    const {currentIndex} = useContext(WindowContext);
    const {folder} = useContext(VideoPageContext);
    useEffect(() => {
        if(folder && data){
            setSelectedItem(data.indexOf(folder.toLowerCase()))
        }
    }, [data ,folder])

    const handleScroll = () => {
        const hzBar = hzBarRef.current;
        const width = hzBar.offsetWidth;
        const scrollWidth = hzBar.scrollWidth;
        const scrollLeft = hzBar.scrollLeft;

        if(width < scrollWidth){
            if (scrollWidth - width <= scrollLeft + 10) {
                leftButtonRef.current.style.display = 'block';
                rightButtonRef.current.style.display = 'none';
            } else if (scrollLeft <= 10) {
                leftButtonRef.current.style.display = 'none';
                rightButtonRef.current.style.display = 'block';
            } else {
                leftButtonRef.current.style.display = 'block';
                rightButtonRef.current.style.display = 'block';
            }
        }
    };

    useEffect(() => {
        const hzBar = hzBarRef.current;

        const handleMouseDown = (e) => {
            setAttachment(true);
            setLastPosition([e.clientX, e.clientY]);
        };

        const handleMouseUp = (e) => {
            e.preventDefault();
            setAttachment(false);
            if (countScroll < 10) {
                e.preventDefault();
                if (e.target.tagName === 'SPAN') {
                    // setSelectedItem())
                    router.push('/?id='+currentIndex+'&folder='+data[Number(e.target.getAttribute('data-set'))]) ;
                }
                setCountScroll(0);
            } else {
                setCountScroll(0);
            }
        };

        const handleMouseMove = (e) => {
            if (attachment) {
                const position = [e.clientX, e.clientY];
                const difference = [(position[0] - lastPosition[0]), (position[1] - lastPosition[1])];
                hzBar.scrollLeft = hzBar.scrollLeft - difference[0];
                hzBar.scrollTop = hzBar.scrollTop - difference[1];
                setLastPosition([e.clientX, e.clientY]);
                setCountScroll(countScroll + 1);
            }
        };

        hzBar.addEventListener('scroll', handleScroll);
        hzBar.addEventListener('mousedown', handleMouseDown);
        hzBar.addEventListener('mouseup', handleMouseUp);
        hzBar.addEventListener('mousemove', handleMouseMove);

        return () => {
            hzBar.removeEventListener('scroll', handleScroll);
            hzBar.removeEventListener('mousedown', handleMouseDown);
            hzBar.removeEventListener('mouseup', handleMouseUp);
            hzBar.removeEventListener('mousemove', handleMouseMove);
        };
    }, [countScroll, attachment, lastPosition]);


    useLayoutEffect(() => {
        handleScroll();
    }, []);


    const scrollAmount = 300;
    const handleLeftClick = () => {
        const hzBar = hzBarRef.current;
        hzBar.scrollLeft -= scrollAmount;
    };
    const handleRightClick = () => {
        const hzBar = hzBarRef.current;
        hzBar.scrollLeft += scrollAmount;
    };

    
  return (
        <div className="hz-bar-contain non-select">
            <div className="hz-bar" ref={hzBarRef}>
                <div className="hz-bar-zs">
                    {data.map((item, index) => (
                        <span data-set={index} className={(selectedItem) === index ? 'select-item-hz-bar' : ''} key={index}>{capitalizeWords(item)}</span>
                    ))}
                </div>
            </div>
            <div className="btn-move-hz-bar-left btn-move-hz-bar" style={{ display: 'none' }}  ref={leftButtonRef} onClick={handleLeftClick}><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1792 1792"><path d="M477.5,996c-55.2-55.2-55.2-139.5,0-194.8c2.8-2.4,2.8-2.4,2.8-2.4l641.6-644.4c55.2-52.4,139.2-52.4,194.4,0 c52.8,55.2,52.8,139.5,0,194.4L764.2,898.4l546.9,547.2c52.4,52.4,52.4,139.5,0,192c-52.8,52.4-139.5,52.4-192,0L477.5,996z"></path></svg></div>
            <div className="btn-move-hz-bar-right btn-move-hz-bar" style={{ display: 'none' }} ref={rightButtonRef} onClick={handleRightClick}><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1792 1792"><path d="M1314.5,796c55.2,55.2,55.2,139.5,0,194.8c-2.8,2.4-2.8,2.4-2.8,2.4l-641.6,644.4c-55.2,52.4-139.2,52.4-194.4,0 c-52.8-55.2-52.8-139.5,0-194.4l552.1-549.7L480.9,346.3c-52.4-52.4-52.4-139.5,0-192c52.8-52.4,139.5-52.4,192,0L1314.5,796z"></path></svg></div>
        </div>
    )
}

export default Menu
