class PolicyPage extends React.Component {
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
            , e( TopMenu, { page: 'policy', user: this.state.user, openSignUpModal: this.openSignUpModal, openLoginModal: this.openLoginModal } )
            , e( 'div', { className: 'ui container' }, [
                e( 'p', {}, 'Although dir.gg supports freedom of the internet and will not comply with terms of use of any particular service in which a dir.gg link may appear, there is a certain amount of respect with which people should afford each other. For this reason, the following types of links are not allowed and will be vigorously enforced by both computerized methods and human reports:' )
                , e( 'ul', {}, [
                    e( 'li', {}, 'Pornography of any kind.' )
                    , e( 'li', {}, 'Human trafficking and black markets.' )
                    , e( 'li', {}, 'Hate and prejudicial websites.' )
                    , e( 'li', {}, 'Websites hosting patently fake news and conspiratorial information which is provably baseless in nature.' )
                    , e( 'li', {}, 'Any website making threats of any kind to life or property.' )
                ])
            ])
            , e( Footer, { user: this.state.user } )
            , e( SignUpModal, { active: this.state.signUpModalActive, close: this.closeSignUpModal } )
            , e( LoginModal, { active: this.state.loginModalActive, close: this.closeLoginModal } )
        ])
    }
}


ReactDOM.render( e( PolicyPage ), document.getElementById( 'root' ) )
