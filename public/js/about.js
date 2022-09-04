class AboutPage extends React.Component {
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
            , e( TopMenu, { page: 'about', user: this.state.user, openSignUpModal: this.openSignUpModal, openLoginModal: this.openLoginModal } )
            , e( 'div', { className: 'ui container' }, [
                e( 'p', {}, 'Dir.gg is a service designed to rapidly place prospective community members in contact with the proper community engagment tool as set forth by dir.gg members. This service also reacts to changing communities by maintaining a permanent link for dynamic social media/community engagement tools as well as ad hoc temporary changes and schedule-based content providers.' )
                , e( 'p', {}, 'Examples:' )
                , e( 'ul', {}, [
                    e( 'li', {}, 'Move from a Facebook page in a growing community to a custom website simply by changing the redirect target.' )
                    , e( 'li', {}, 'Direct community members to a tournament or esports service temporarily.' )
                    , e( 'li', {}, 'Move from one streaming service to another seamlessly as needed.' )
                    , e( 'li', {}, 'Link users to a live stream during streaming hours, and a content page with vods outside streaming hours.' )
                    , e( 'li', {}, 'All clan members can represent a single clan website just with their normal clan tag.' )
                ])
            ])
            , e( Footer, { user: this.state.user } )
            , e( SignUpModal, { active: this.state.signUpModalActive, close: this.closeSignUpModal } )
            , e( LoginModal, { active: this.state.loginModalActive, close: this.closeLoginModal } )
        ])
    }
}


ReactDOM.render( e( AboutPage ), document.getElementById( 'root' ) )
