class TechnicalPage extends React.Component {
    constructor( props ) {
        super( props )

        this.openSignUpModal = this.openSignUpModal.bind( this )
        this.closeSignUpModal = this.closeSignUpModal.bind( this )
        this.openLoginModal = this.openLoginModal.bind( this )
        this.closeLoginModal = this.closeLoginModal.bind( this )

        this.state = {
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
            if ( res.status == 200 ) {
                res.json()
                .then( data => {
                    console.log( data )
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
        return e( 'div', {}, [
            e( 'div', { className: `ui page dimmer ${ this.state.dimmer ? 'active' : '' }` } )
            , e( TopMenu, { page: 'technical', user: this.state.user, openSignUpModal: this.openSignUpModal, openLoginModal: this.openLoginModal } )
            , e( 'div', { className: 'ui container' }, [
                e( 'p', {}, 'Dir.gg links users with three distinct methods as determined by the dir.gg member:' )
                , e( 'ul', {}, [
                    e( 'li', {}, [
                        e( 'strong', {}, 'Link' )
                        , ': a custom link to anywhere which does not violate the '
                        , e( 'a', { href: '/policy', target: '_blank' }, 'terms of use' )
                        , ', is not another dir.gg link, and is not another redirect service which resolves to dir.gg.'
                    ])
                    , e( 'li', {}, [
                        e( 'strong', {}, 'Splash' )
                        , ': custom splash pages with messages and media.'
                    ])
                    , e( 'li', {}, [
                        e( 'strong', {}, 'Endpoint' )
                        , ': a known existing service with which a link can be derived from a member-provided username, gamertag, etc.'
                    ])
                ])
            ])
            , e( Footer, { user: this.state.user } )
            , e( SignUpModal, { active: this.state.signUpModalActive, close: this.closeSignUpModal } )
            , e( LoginModal, { active: this.state.loginModalActive, close: this.closeLoginModal } )
        ])
    }
}


ReactDOM.render( e( TechnicalPage ), document.getElementById( 'root' ) )
