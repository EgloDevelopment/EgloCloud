class TopMenu extends React.Component {
    constructor( props ) {
        super( props )

        this.handleLoginOrProfile = this.handleLoginOrProfile.bind( this )

        this.state = {}
    }

    handleLoginOrProfile( e ) {
        if ( !this.props.user ) {
            return this.props.openLoginModal()
        }

        location.href = '/profile'
    }

    render() {
        const isHome = this.props.page == 'home'
        const homeLink = e( 'a', { className: `item ${ isHome ? 'active' : '' }`, href: `${ isHome ? '#' : '/' }` }, 'Home' )

        const isAbout = this.props.page == 'about'
        const aboutLink = e( 'a', { className: `item ${ isAbout ? 'active' : '' }`, href: `${ isAbout ? '#' : '/about' }` }, 'About' )

        let signUpBtn, loginOrProfileBtn

        if ( !this.props.user ) {
            signUpBtn = e( 'div', { className: 'item' }, [
                e( 'a', { className: 'ui primary button', onClick: this.props.openSignUpModal }, 'Sign up' )
            ])
        }

        if ( this.props.page != 'profile' ) {
            loginOrProfileBtn = e( 'div', { className: 'item' }, [
                e( 'a', { className: 'ui button', onClick: this.handleLoginOrProfile }, this.props.user ? `Welcome back ${ this.props.user.user.username }!` : 'Log in' )
            ])
        }

        return e( 'div', { className: 'ui large top menu', style: { marginBottom: 0 } }, [
            e( 'div', { className: 'ui container' }, [
                homeLink
                , aboutLink
                , e( 'div', { className: 'right menu' }, [
                    loginOrProfileBtn
                    , signUpBtn
                ])
            ])
        ])
    }
}
