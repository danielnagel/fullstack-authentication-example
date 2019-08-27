import {Provider} from 'react-redux';
import App, {Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../src/redux';
import { InferProps } from 'prop-types';

declare namespace IApp {
	export interface IProps extends InferProps<{}> {
		store: any;
	}

	export interface IState {}
}

class MyApp extends App<IApp.IProps> {
    static async getInitialProps(props : any) {
        let pageProps = {};

		if (props.Component.getInitialProps) {
			pageProps = await props.Component.getInitialProps(props.ctx);
		}

		return { pageProps };
    }

    render(): JSX.Element {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps}/>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(initStore, {debug: true})(MyApp);