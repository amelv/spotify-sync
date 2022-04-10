import React from "react"

const Loading = (props: any) => {
    if(props.error) {
        console.log(props.error)
        return <div>Error! <button onClick= { props.retry }>Retry</button></div>
    } else {
        return <div style={{minHeight: "100vh"}}>Loading...</div>
    }
}

export default Loading
