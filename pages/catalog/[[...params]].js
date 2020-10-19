import React from "react";
import {useRouter} from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import {useDispatch, useSelector} from "react-redux";
import {NextPage} from 'next';
import {Provider, connect} from 'react-redux';
import {wrapper, State} from '../../store';



const Catalog = ({data, slug, stateSSR}) => {
    const router = useRouter()
    const {params} = router.query

    const state = useSelector(state => state);
    const dispatch = useDispatch()

    console.log(stateSSR);
    console.log(state);

    return (

        <>
            <Link href="/catalog/cremerie">
                <a>cremerie</a>
            </Link>
            <Link href="/catalog/boucherie">
                <a>boucherie</a>
            </Link>
            <Card>
                <div>{state.client.tick}</div>
                <Button onClick={() => dispatch({type: 'CLIENT_ACTION', payload: 'coucou'})}>Dispatch!</Button>
            </Card>
            {data && data.products.products.map((product) => (
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {product.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>

            ))}
        </>

    )
}


// This gets called on every request
export const getServerSideProps = wrapper.getServerSideProps( async (context) => {

    const stateSSR = context.store.getState();

    context.store.dispatch({type: 'SERVER_ACTION', payload: stateSSR.server.tick++});
    // Fetch data from external API
    const slug = context.params.params[0];
    const res = await fetch(`https://preprod.foodomarket.com/api/catalog/taxon/${slug}`)
    const data = await res.json()

    // Pass data to the page via props
    return {props: {data, slug, stateSSR}}
})

export default Catalog;
