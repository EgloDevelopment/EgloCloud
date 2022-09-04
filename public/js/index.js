class IndexPage extends React.Component {
    constructor( props ) {
        super( props )

        this.openSignUpModal = this.openSignUpModal.bind( this )
        this.closeSignUpModal = this.closeSignUpModal.bind( this )
        this.openLoginModal = this.openLoginModal.bind( this )
        this.closeLoginModal = this.closeLoginModal.bind( this )

        this.state = {
            // ui
            signUpModalActive: false
            , loginModalActive: false
            , dimmer: false
            // app data
            , user: null
        }

        this.getProfileStatus()
    }

    getProfileStatus() {
        fetch( '/profilestatus' )
        .then( res => {
            console.log( res )
            // 200 will only be logged in user
            if ( res.status == 200 || res.status == 304 ) {
                res.json()
                .then( data => {
                    this.setState({
                        user: data
                    })
                })
                .catch( err => {
                    console.log( 'Error parsing JSON' )
                })
            // 400 will be json with an "err" property
            } else if ( res.status == 400 ) {
                res.json()
                .then( data => {
                    this.setState({ formErr: data.err })
                })
                .catch( err => {
                    console.log( err )
                    this.setState({ formErr: 'Unknown error from server.' })
                })
            // 403 user not logged in - will have json "err" property
            } else if ( res.status == 403 ) {
                res.json()
                .then( data => {
                    this.setState({ formErr: data.err })
                })
                .catch( err => {
                    console.log( err )
                    this.setState({ formErr: 'Unknown error from server.' })
                })
            // 500 is just a normal internal service error
            } else if ( res.status == 500 ) {
                console.log( err )
                this.setState({ formErr: 'Unknown error from server.' })
            // other status codes won't be emitted by the server
            } else {
                console.log( 'Can\'t handle status code', res.status )
                this.setState({ formErr: 'Unknown error from server.' })
            }
        })
        .catch( err => {
            console.log( err )
            this.setState({ formErr: err })
        })
    }

    openSignUpModal() {
        this.setState({
            signUpModalActive: true
            , dimmer: true
        })
    }

    closeSignUpModal() {
        this.setState({
            signUpModalActive: false
            , dimmer: false
        })
    }

    openLoginModal() {
        this.setState({
            loginModalActive: true
            , dimmer: true
        })
    }

    closeLoginModal() {
        this.setState({
            loginModalActive: false
            , dimmer: false
        })
    }

    render() {
        let getStartedBtn

        if ( !this.state.user ) {
            getStartedBtn = e( 'div', { className: 'ui huge primary button', onClick: this.openSignUpModal }, [
                'Get Started'
                , e( 'i', { className: 'right arrow icon' } )
            ])
        }

        return e( 'div', {}, [
            e( 'div', { className: `ui page dimmer ${ this.state.dimmer ? 'active' : '' }` } )
            , e( TopMenu, { page: 'home', user: this.state.user, openSignUpModal: this.openSignUpModal, openLoginModal: this.openLoginModal } )
            , e( 'div', { className: 'ui inverted vertical masthead center aligned segment' }, [
                e( 'div', { className: 'ui text container' }, [
                    e( 'h1', { className: 'ui inverted header' }, 'dir.gg' )
                    , e( 'h2', {}, 'Connect your community your way.' )
                    , getStartedBtn
                ])
            ])
            , e( 'div', { className: 'ui vertical stripe segment' }, [
                e( 'div', { className: 'ui middle aligned stackable grid container' }, [
                    e( 'div', { className: 'row' }, [
                        e( 'div', { className: 'eight wide column' }, [
                            e( 'h3', { className: 'ui header' }, 'How does it work?' )
                            , e( 'div', {}, [
                                'Sign up to select an extension such as '
                                , e( 'strong', {}, 'x1337' )
                                , ' and put it in your gamer tag (eg. '
                                , e( 'strong', {}, 'Gamer_x1337' )
                                , ')! This will allow people to look you up at '
                                , e( 'a', { href: 'https://dir.gg/1337', target: '_blank' }, 'https://dir.gg/1337' )
                                , ' where you can redirect them wherever you want. Some redirection options include:'
                                , e( 'ul', {}, [
                                    e( 'li', {}, 'Any link you like (while conforming to the ', [
                                        e( 'a', { href: '/policy', target: '_blank' }, 'terms of use' )
                                        , ').'
                                    ])
                                    , e( 'li', {}, 'Pre-designed splash pages with your own message.' )
                                    , e( 'li', {}, 'Known endpoints such as Twitch, Caffeine, etc.' )
                                ])
                            ])
                            , e( 'h3', { className: 'ui header' }, 'Well-Known Extensions (WKx)' )
                            , e( 'div', {}, 'Well-known extensions may be used for inverted lookups.' )
                        ])
                        , e( 'div', { className: 'six wide floated column' }, [
                            e( 'img', { className: 'ui large bordered rounded image', src: 'https://via.placeholder.com/350' } )
                        ])
                    ])
                    , e( 'div', { className: 'row' }, [
                        e( 'div', { className: 'center aligned column' }, [
                            e( 'a', { className: 'ui huge button', href: '/about' }, 'Learn More' )
                        ])
                    ])
                ])
            ])
            , e( 'div', { className: 'ui vertical stripe quote segment' }, [
                e( 'div', { className: 'ui equal width stackable internally celled grid' }, [
                    e( 'div', { className: 'center aligned row' }, [
                        e( 'div', { className: 'column' }, [
                            e( 'h3', {}, 'Just the service I needed!' )
                            , e( 'p', {}, 'This will help me grow my community immensely!' )
                        ])
                        , e( 'div', { className: 'column' }, [
                            e( 'h3', {}, 'Faster and more practical than link-shortening services!' )
                            , e( 'p', {}, [
                                e( 'img', { className: 'ui avatar image', src: 'https://via.placeholder.com/25' } )
                                , e( 'strong', {}, 'Eidylon' )
                                , ' Not a professional gamer'
                            ])
                        ])
                    ])
                ])
            ])
            , e( Footer, { user: this.state.user } )
            , e( SignUpModal, { active: this.state.signUpModalActive, close: this.closeSignUpModal } )
            , e( LoginModal, { active: this.state.loginModalActive, close: this.closeLoginModal } )
        ])
    }
}


ReactDOM.render( e( IndexPage ), document.getElementById( 'root' ) )
