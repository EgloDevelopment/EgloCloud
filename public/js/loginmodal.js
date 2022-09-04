class LoginModal extends React.Component {
    constructor( props ) {
        super( props )

        this.handleUsernameChange = this.handleUsernameChange.bind( this )
        this.handlePasswordChange = this.handlePasswordChange.bind( this )
        this.handleLogin = this.handleLogin.bind( this )

        this.state = {
            // form
            username: ''
            , password: ''
            // ui
            , loginErr: false
            , loginErrMsg: ''
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

    handleLogin( e ) {
        let { username, password } = this.state

        if ( !username ) {
            return this.setState({
                loginErr: true
                , loginErrMsg: 'Username is required.'
            })
        }

        if ( !password ) {
            return this.setState({
                loginErr: true
                , loginErrMsg: 'Password is required.'
            })
        }

        fetch( `/login/${ username }/${ password }`, {
            method: 'GET'
            , redirect: 'follow'
        })
        .then( res => {
            console.log( res )
            // 200 will only be a good login
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

    render() {
        return e( 'div', { className: `ui modal ${ this.props.active ? 'active' : '' }` }, [
            e( 'i', { className: 'close icon', onClick: this.props.close } )
            , e( 'div', { className: 'header' }, 'Log in!' )
            , e( 'div', { className: 'content' }, [
                e( 'div', { className: 'ui middle aligned center aligned grid' }, [
                    e( 'div', { className: 'column' }, [
                        e( 'form', { className: 'ui large form' }, [
                            e( 'div', { className: 'field' }, [
                                e( 'div', { className: 'ui left icon input' }, [
                                    e( 'i', { className: 'user icon' } )
                                    , e( 'input', { type: 'text', autoFocus: true, name: 'username', value: this.state.username, placeholder: 'Username', onChange: this.handleUsernameChange } )
                                ])
                            ])
                            , e( 'div', { className: 'field' }, [
                                e( 'div', { className: 'ui left icon input' }, [
                                    e( 'i', { className: 'lock icon' } )
                                    , e( 'input', { type: 'password', name: 'password', value: this.state.password, placeholder: 'Password', onChange: this.handlePasswordChange } )
                                ])
                            ])
                            , e( 'div', { className: `ui error message ${ this.state.loginErr ? 'visible' : '' }` }, this.state.loginErrMsg )
                        ])
                    ])
                ])
            ])
            , e( 'div', { className: 'actions' }, [
                e( 'div', { className: 'ui button', onClick: this.props.close }, 'Cancel' )
                , e( 'div', { className: 'ui primary button', onClick: this.handleLogin }, 'Login' )
            ])
        ])
    }
}
