import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Card from "@material-ui/core/Card";
import {Button} from "@material-ui/core";
import Link from "next/link";

const MyPage = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch()

    return (
        <Card>
            <Link href="/anotherpage">
                <a>AnotherPage</a>
            </Link>
            <div>{state.client.tick}</div>
            <Button onClick={() => dispatch({type: 'CLIENT_ACTION', payload: 'coucou'})}>Dispatch!</Button>
        </Card>
    );
}


export default MyPage;
