import React, { useState, useEffect } from 'react'
import { LLNode } from '../data-structures/LLNode'
import './App.css'
import { reverseLinkedList } from '../algorithms/reverse-linked-list'
import { LLNodeC } from '../components/LLNodeC/LLNodeC'
import { Arrow } from '../components/Arrow/Arrow'
export const App = () => {

    const [start, setStart] = useState(null)
    const [pointers, setPointers] = useState({})
    const [llNodeValue, setLLNodeValue] = useState(null)
    const [reversedNodeMap, setReverseNodeMap] = useState(new Map())
    const [linkedList, setLinkedList] = useState([])
    const [reverse, setReverse] = useState(false)
    const [canReverse, setCanReverse] = useState(false)
    const [inputData, setInputData] = useState("1,2,3,4,5")
    useEffect(()=>{
              handleData()
    },[])
    useEffect(() => {
        setLinkedList([])
        setCanReverse(true)
        parseLL(start)
    }, [start])
    useEffect(() => {
        if (reverse) {
            setLinkedList([])
            setReverseNodeMap(new Map(reversedNodeMap.set(pointers.current, true)))
            parseSyncLL(start)
        }
    }, [pointers])
    useEffect(() => {
        setLinkedList([...linkedList, llNodeValue])
    }, [llNodeValue])
    const isValidInput = () => {
        return new RegExp(/^([a-z0-9\s]+,)+([a-z0-9\s]+){1}$/i).test(inputData)
    }
    const handleData = () => {
        if (isValidInput()) {
            const result = inputData.split(",")
            let nodeList = result.map(value => {
                return new LLNode(value)
            })
            for (let start = 0; start < nodeList.length; start++) {
                if (start !== nodeList.length - 1) {
                    nodeList[start].next = nodeList[start + 1]
                }
            }
            nodeList[nodeList.length - 1].next = null;
            setStart(nodeList[0])
            setInputData("")
        }
    }
    const parseLL = async (temp) => {
        while (temp !== null) {
            const llNodeValue = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(<><LLNodeC value={temp.value} pointedBy={temp === pointers.pre ? "pre" : temp === pointers.current ? "current" : temp === pointers.post ? "post" : ""} />{temp.next !== null ? <Arrow direction="right" /> : null}</>)
                }, 200)
            })
            setLLNodeValue(llNodeValue)
            temp = temp.next;
        }
    }
    const parseSyncLL = async (temp) => {
        const result = []
        while (temp !== null) {
            const arrow = reversedNodeMap.get(temp) ? <Arrow direction="left" /> : <Arrow direction="right" />
            const llNode = <LLNodeC value={temp.value} pointedBy={temp === pointers.pre ? "pre" : temp === pointers.current ? "current" : temp === pointers.post ? "post" : ""} />
            const llNodeValue = !reversedNodeMap.get(temp) ? <>{llNode}{temp.next !== null ? arrow : null}</> : <>{arrow}{llNode}{temp === pointers.current ? <div className="empty"></div> : null}</>
            result.push(llNodeValue)
            temp = temp.next;
        }
        setLinkedList(result)
    }
    const reverseLL = async (temp) => {
        let pre = null;
        let current = temp;
        let post = current.next;
        setReverse(true)
        setCanReverse(false)
        setPointers({ pre, current, post })
        while (post !== null) {
            let pointers = await new Promise(resolve => {
                setTimeout(() => {
                    pre = current;
                    current = post;
                    post = post.next;
                    resolve({ pre, current, post })
                }, 2000)
            })
            setPointers(pointers)
        }
        setReverse(false)
        setReverseNodeMap(new Map())
        setLLNodeValue(null)
        setPointers({})

        setTimeout(() => {
            setStart(reverseLinkedList(temp))
        }, 2000)
    }
    return (
        <div>
            <div className="userInput">
            <input disabled={!canReverse} placeholder="Enter comma-separated values..." value={inputData} onChange={(e) => setInputData(e.target.value)}></input>
            <button disabled={!canReverse} onClick={() => handleData()}>Submit</button>
            </div>
            <div className="linkedList">
                {linkedList && linkedList.map(llNode => llNode)}
            </div>
            {!canReverse?
            <div className="labelRow">
                <div className="label"><div className="pre"></div><span className="labelNode">Previous Node</span></div>
                <div className="label"><div className="current"></div><span className="labelNode">Current Node</span></div>
                <div className="label"><div className="post"></div><span className="labelNode">Next Node</span></div>
            </div>:null}
            <div className="buttonWrapper">
                <button disabled={!canReverse} onClick={() => (reverseLL(start))}>Reverse</button>
            </div>
            <div className="procedure">
                <code>
                 <p className="tab">//Assume start points to first node in linkedList</p>   
                <p className="tab">Algorithm:</p>
                    <span className="tab">
                        previous = null;<br/>
                        current = start.link;<br/>
                        next = current.link;<br/>
                        {!canReverse?<>
                        <div className="codeAnimate">
                        <span className="tab">while ( next !== null ){"{"}</span>
                        <span className="tab">current.link = previous;</span>
                        <span className="tab">previous = current;</span>
                        <span className='tab'>current = next;</span>
                        <span className="tab">next = next.link;</span>
                        <span className="tab">{"}"}</span>          
                        </div>     
                        <span className="tab">current.link = previous</span>
                        <span className="tab">start = current</span>
                        </>:null}
                    </span>
                </code>
            </div>
        </div>
    )
}