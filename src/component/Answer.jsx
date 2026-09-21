import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helpers";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from "react-markdown";
const Answer =({ans,totalResult,index, type})=>{

    const [heading,setHeading] = useState(false);
    const [answer,setAnswer] = useState(ans);


    useEffect(()=>{
        if(checkHeading(ans)){
            setHeading(true);
            setAnswer(replaceHeadingStarts(ans))
        }
        
    }, [])

    const renderer={
        code({node, inline, className, children,...props}){
           const match= /language-(\w+)/.exec(className || '');
              return !inline && match?(
                <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={dark}
                preTag="div"
                />
              ):(
                <code {...props} className={className}>
                    {children}
                </code>
              )

        }
    }

    return(
        <>
        {
            index==0 && totalResult>1?<span className="pt-2 text-lg block text-white">{answer}</span>:
             heading?<span className="pt-2 text-lg block dark:text-white text-zinc-500">{answer}</span>
             :<span className={type=='q'?'p-1':'p-5'} >
                <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
             </span>  

        }
        
        </>
    )
}

export default Answer