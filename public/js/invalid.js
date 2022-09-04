class InvalidPage extends React.Component {
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
            , e( TopMenu, { page: 'invalid', user: this.state.user, openSignUpModal: this.openSignUpModal, openLoginModal: this.openLoginModal } )
            , e( 'div', { className: 'ui container' }, [
                e( 'p', {}, 'Extension not found.' )
                , e( 'p', {}, 'Want it for yourself? Sign up!' )
            ])
            , e( Footer, { user: this.state.user } )
            , e( SignUpModal, { active: this.state.signUpModalActive, close: this.closeSignUpModal } )
            , e( LoginModal, { active: this.state.loginModalActive, close: this.closeLoginModal } )
        ])
    }
}


ReactDOM.render( e( InvalidPage ), document.getElementById( 'root' ) )
