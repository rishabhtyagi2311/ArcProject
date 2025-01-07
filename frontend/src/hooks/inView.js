import React from "react";
import { useEffect, useState, useRef, RefObject } from "react";

function useIntersectionObserver()
{
    const ref = useRef(null);
    const [isInView, setIsInView]  = useState(false);

    useEffect(
        ()=>{

           const observer = new IntersectionObserver(
            ([entry]) =>{
                if(entry.isIntersecting && !isInView)
                {
                    setIsInView(true);
                    if(ref.current)
                    {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold: 0.2,
            }
           );
           
           if(ref.current)
           {
            observer.observe(ref.current)
           }

           return ()=>
           {
            if(ref.current)
            {
                observer.unobserve(ref.current);
            }
           };

        }, [isInView]
    );
    return [ref , isInView];

}

export default useIntersectionObserver;