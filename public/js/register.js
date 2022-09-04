class RegisterPage extends React.Component {
    constructor( props ) {
        super( props )

        this.handleUsernameChange = this.handleUsernameChange.bind( this )
        this.handlePasswordChange = this.handlePasswordChange.bind( this )
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind( this )
        this.handleRegister = this.handleRegister.bind( this )
        this.handleCancel = this.handleCancel.bind( this )

        this.state = {
            // ui
            dimmer: false
            // registration form
            , username: ''
            , password: ''
            , passwordConfirm: ''
            , formErr: false
            // optional extension (could be reserved for various reasons)
            , reservedExtension: null
            , reservedExtMsg: false
        }
    }

    handleUsernameChange( e ) {
        const val = e.target.value

        this.setState({
            username: val
        })
    }

    handlePasswordChange( e ) {
        const val = e.target.value

        this.setState({
            password: val
        })
    }

    handlePasswordConfirmChange( e ) {
        const val = e.target.value

        this.setState({
            passwordConfirm: val
        })
    }

    handleRegister( e ) {
        let { username, password, passwordConfirm } = this.state

        // validation
        username = username.trim()

        if ( !username ) {
            return this.setState({
                formErr: 'Username must not be blank.'
            })
        }

        if ( password != passwordConfirm ) {
            return this.setState({
                formErr: 'Passwords must match.'
            })
        }

        let payload = {
            username: this.state.username
            , password: this.state.password
        }

        // only include reserved extension if it's applicable
        // route will create it along with the registration
        if ( this.state.reservedExtension ) {
            payload.reservedExtension = this.state.reservedExtension
        }

        fetch( '/register', {
            method: 'POST'
            , headers: { 'Content-Type': 'application/json' }
            , body: JSON.stringify( payload )
        })
        .then( res => {
            console.log( res )
            // 200 will only be a good registration
            if ( res.status == 200 ) {
                res.json()
                .then( data => {
                    console.log( data )
                    location.href = '/'
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

    handleCancel( e ) {
        location.href = '/'
    }

    render() {
        return e( 'div', {}, [
            e( 'div', { className: `ui page dimmer ${ this.state.dimmer ? 'active' : '' }` } )
            , e( 'div', { className: 'ui segment' }, [
                e( 'div', { className: `ui info message ${ this.state.reservedExtMsg ? 'visible' : 'hidden' }` }, [
                    e( 'div', { className: 'header' }, `x${ this.state.reservedExtension } won't be available for long!` )
                    , e( 'p', {}, [
                        e( 'span', {}, 'Signing up now will include the extension ' )
                        , e( 'strong', {}, [
                            e( 'code', {}, `x${ this.state.reservedExtension }` )
                        ])
                        , e( 'span', {}, ' automatically!' )
                    ])
                ])
                , e( 'h1', { className: 'ui header'}, 'Sign up!' )
                , e( 'div', { className: 'div' }, [
                    e( 'div', { className: 'ui segment' }, [
                        e( 'div', { className: 'ui form' }, [
                            e( 'div', { className: 'field' }, [
                                e( 'label', {}, 'Username' )
                                , e( 'input', { type: 'text', name: 'username', value: this.state.username, onChange: this.handleUsernameChange } )
                            ])
                            , e( 'div', { className: 'field' }, [
                                e( 'label', {}, 'Password' )
                                , e( 'input', { type: 'password', name: 'password', value: this.state.password, onChange: this.handlePasswordChange } )
                            ])
                            , e( 'div', { className: 'field' }, [
                                e( 'label', {}, 'Confirm Password' )
                                , e( 'input', { type: 'password', name: 'passwordConfirm', value: this.state.passwordConfirm, onChange: this.handlePasswordConfirmChange } )
                            ])
                            , e( 'div', { className: `ui error message ${ this.state.formErr ? 'visible' : '' }` }, [
                                e( 'div', { className: 'header' }, 'Uh oh! Something went wrong :(' )
                                , e( 'p', {}, this.state.formErr )
                            ])
                            , e( 'button', { className: 'ui primary button', onClick: this.handleRegister }, 'Register' )
                            , e( 'button', { className: 'ui button', onClick: this.handleCancel }, 'Cancel' )
                        ])
                    ])
                ])
            ])
            , e( Footer )
        ])
    }
}


ReactDOM.render( e( RegisterPage ), document.getElementById( 'root' ) )
