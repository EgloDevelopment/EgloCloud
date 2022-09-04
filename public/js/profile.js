class ProfilePage extends React.Component {
    constructor( props ) {
        super( props )

        this.handleRedirectLinkChange = this.handleRedirectLinkChange.bind( this )

        this.handleSplashTextChange = this.handleSplashTextChange.bind( this )
        
        this.handleEndpointTypeChange = this.handleEndpointTypeChange.bind( this )
        this.handleEndpointHandleChange = this.handleEndpointHandleChange.bind( this )
        this.handleAddEndpointBtn = this.handleAddEndpointBtn.bind( this )
        this.handleDeleteEndpointBtn = this.handleDeleteEndpointBtn.bind( this )

        this.handleExtensionEditingChange = this.handleExtensionEditingChange.bind( this )
        this.handleExtensionSaveBtn = this.handleExtensionSaveBtn.bind( this )
        this.handleExtensionCancelBtn = this.handleExtensionCancelBtn.bind( this )

        this.state = {
            dimmer: false
            , offMsg: true
            , isRedirect: false
            , isSplash: false
            , isEndpoint: false
            , extensionEditing: null
            , extensionLoading: false
            , extensionLoadingErr: false
            , extensionSaveErr: false
            , extensionSaveSuccessMsg: false
            // redirect fields
            , redirectLink: ''
            , redirectMsg: null
            , redirectErr: null
            // splash fields
            , splashText: ''
            , splashMsg: null
            , splashErr: null
            // endpoint fields
            , endpoints: []
            , endpointsToRemove: []
            , endpointType: ''
            , endpointHandle: ''
            , endpointMsg: null
            , endpointErr: null
            , activeEpId: null
            // app data
            , user: null
            , extensions: []
            , editingExtensionData: []
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
                    this.getProfileExtensions()
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

    getProfileExtensions() {
        fetch( '/profile/extensions' )
        .then( res => {
            console.log( res )
            // 200 will only be good response with data
            if ( res.status == 200 ) {
                res.json()
                .then( data => {
                    console.log( data )
                    this.setState({
                        extensions: data
                    })

                    if ( data.length ) {
                        this.loadExtensionData( data[0].id )
                    }
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
            // 403 user not logged in or extension isn't owned by user - will have json "err" property
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

    loadExtensionData( extId ) {
        // set ui loading state
        this.setState({
            extensionEditing: extId
            , extensionLoading: true
        })

        fetch( `/profile/extension/${ extId }` )
        .then( res => {
            // 200 will only be good response with data
            if ( res.status == 200 ) {
                res.json()
                .then( data => {
                    let redirectLink = null
                    let splashText = ''

                    if ( data.redirects.length ) {
                        redirectLink = data.redirects[0].link
                    }

                    if ( data.splashes.length ) {
                        splashText = data.splashes[0].msg
                    }

                    const activeEps = data.endpoints.filter( ep => ep.active )

                    this.setState({
                        editingExtensionData: data
                        , extensionLoading: false
                        , redirectLink
                        , splashText
                        , endpoints: data.endpoints
                        , activeEpId: activeEps.length ? activeEps[0].id : null
                        , isRedirect: data.extension.active_type == 'redirect'
                        , isSplash: data.extension.active_type == 'splash'
                        , isEndpoint: data.extension.active_type == 'endpoint'
                        , offMsg: data.extension.active_type == null
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

    handleRedirectLinkChange( e ) {
        const val = e.target.value

        this.setState({
            redirectLink: val
        })
    }

    handleSplashTextChange( e ) {
        const val = e.target.value

        this.setState({
            splashText: val
        })
    }

    handleEndpointTypeChange( e, idx ) {
        const val = e.target.value
        let newEndpoints = this.state.endpoints.slice()

        newEndpoints[idx].type = val

        this.setState({
            endpoints: newEndpoints
        })
    }

    handleEndpointHandleChange( e, idx ) {
        const val = e.target.value
        let newEndpoints = this.state.endpoints.slice()

        newEndpoints[idx].handle = val

        this.setState({
            endpoints: newEndpoints
        })
    }

    handleRedirectType( e, redirectType ) {
        if ( redirectType == 'redirect' ) {
            const val = !this.state.isRedirect
            if ( val ) {
                this.setState({
                    isRedirect: true
                    , isSplash: false
                    , isEndpoint: false
                    , offMsg: false
                })
            } else {
                this.setState({
                    isRedirect: false
                    , offMsg: !this.state.isSplash && !this.state.isEndpoint
                })
            }
        } else if ( redirectType == 'splash' ) {
            const val = !this.state.isSplash
            if ( val ) {
                this.setState({
                    isRedirect: false
                    , isSplash: true
                    , isEndpoint: false
                    , offMsg: false
                })
            } else {
                this.setState({
                    isSplash: false
                    , offMsg: !this.state.isRedirect && !this.state.isEndpoint
                })
            }
        } else if ( redirectType == 'endpoint' ) {
            const val = !this.state.isEndpoint
            if ( val ) {
                this.setState({
                    isRedirect: false
                    , isSplash: false
                    , isEndpoint: true
                    , offMsg: false
                })
            } else {
                this.setState({
                    isEndpoint: false
                    , offMsg: !this.state.isRedirect && !this.state.isSplash
                })
            }
        }
    }

    handleExtensionEditingChange( e ) {
        const val = e.target.value

        loadExtensionData( val )
    }

    handleAddEndpointBtn( e ) {
        let newEndpoints = this.state.endpoints.slice()

        newEndpoints.push({
            type: ''
            , handle: ''
        })

        this.setState({
            endpoints: newEndpoints
        })
    }

    handleDeleteEndpointBtn( e, idx ) {
        let newEndpoints = this.state.endpoints.slice()
        newEndpoints.splice( idx, 1 )

        let newState = {
            endpoints: newEndpoints
        }

        const ep = this.state.endpoints[idx]

        if ( ep.hasOwnProperty( 'id' ) ) {
            let endpointsToRemove = this.state.endpointsToRemove.slice()

            endpointsToRemove.push( ep.id )
            newState.endpointsToRemove = endpointsToRemove
        }

        this.setState( newState )
    }

    handleExtensionSaveBtn( e ) {
        let payload = {
            extId: this.state.extensionEditing
            , activeType: this.state.isRedirect ? 'redirect' : this.state.isSplash ? 'splash' : this.state.isEndpoint ? 'endpoint' : null
            , activeId: this.state.isEndpoint ? this.state.activeEpId : null
            , redirect: {
                link: this.state.redirectLink
            }
            , splash: {
                message: this.state.splashText
            }
            , endpoints: this.state.endpoints
            , endpointsToRemove: this.state.endpointsToRemove
        }
        
        fetch( '/profile/extension', {
            method: 'POST'
            , headers: { 'Content-Type': 'application/json' }
            , body: JSON.stringify( payload )
        })
        .then( res => {
            console.log( res )
            // 200 will only be good response with data
            if ( res.status == 200 ) {
                res.json()
                .then( data => {
                    console.log( data )

                    this.setState({
                        extensionSaveSuccessMsg: true
                        , extensionSaveErr: false
                    })
                })
                .catch( err => {
                    console.log( 'Error parsing JSON' )
                })
            // 400 will be json with an "err" property
            } else if ( res.status == 400 ) {
                res.json()
                .then( data => {
                    this.setState({
                        extensionSaveSuccessMsg: false
                        , extensionSaveErr: data.err
                    })
                })
                .catch( err => {
                    console.log( err )
                    this.setState({
                        extensionSaveSuccessMsg: false
                        , extensionSaveErr: 'Unknown error from server.'
                    })
                })
            // 403 user not logged in - will have json "err" property
            } else if ( res.status == 403 ) {
                res.json()
                .then( data => {
                    this.setState({
                        extensionSaveSuccessMsg: false
                        , extensionSaveErr: data.err
                    })
                })
                .catch( err => {
                    console.log( err )
                    this.setState({
                        extensionSaveSuccessMsg: false
                        , extensionSaveErr: 'Unknown error from server.'
                    })
                })
            // 500 is just a normal internal service error
            } else if ( res.status == 500 ) {
                this.setState({
                    extensionSaveSuccessMsg: false
                    , extensionSaveErr: 'Unknown error from server.'
                })
            // other status codes won't be emitted by the server
            } else {
                console.log( 'Can\'t handle status code', res.status )
                this.setState({
                    extensionSaveSuccessMsg: false
                    , extensionSaveErr: 'Unknown error from server.'
                })
            }
        })
        .catch( err => {
            console.log( err )
            this.setState({
                extensionSaveSuccessMsg: false
                , extensionSaveErr: 'Unknown error from server.'
            })
        })
    }

    handleExtensionCancelBtn( e ) {
        this.loadExtensionData( this.state.extensionEditing )
    }

    handleEndpointIsActive( e, ep ) {
        let endpoints = this.state.endpoints.slice()
        let activeId = null
        const newVal = !ep.active

        endpoints.forEach( ea => {
            if ( ea.id == ep.id ) {
                ea.active = newVal
                if ( newVal ) activeId = ep.id
            } else {
                if ( newVal == true ) {
                    ea.active = false
                }
            }
        })

        this.setState({
            endpoints
            , activeEpId: activeId
        })
    }
    
    render() {
        let editExtOpts = []

        if ( !this.state.extensions.length ) {
            editExtOpts.push(
                e( 'option', { value: null }, '(No extensions.)' )
            )
        }

        this.state.extensions.forEach( ext => {
            editExtOpts.push(
                e( 'option', { value: ext.id }, ext.ext )
            )
        })

        console.log( 'editing', this.state.extensionEditing )

        let endpointForms = []

        this.state.endpoints.forEach( ( ep, idx ) => {
            // TODO create opts from config
            endpointForms.push(
                e( 'div', { key: getKey(), className: `fields ${ this.state.isEndpoint ? '' : 'disabled' }` }, [
                    e( 'div', { className: 'one wide field' }, [
                        e( 'label', {}, 'Active?' )
                        , e( 'div', { className: 'ui toggle checkbox', onClick: ( e ) => this.handleEndpointIsActive( e, ep ) }, [
                            e( 'input', { className: 'hidden', tabIndex: 0, name: `isactive_${ ep.type }`, defaultChecked: ep.active, type: 'checkbox' } )
                            , e( 'label', {}, '' )
                        ])
                    ])
                    , e( 'div', { className: 'three wide field' }, [
                        e( 'label', {}, 'Endpoint Type' )
                        , e( 'select', { name: 'endpointType', defaultValue: ep.type, onBlur: ( e ) => { this.handleEndpointTypeChange( e, idx ) } }, [
                            e( 'option', { value: 'afreeca' }, 'Afreeca' )
                            , e( 'option', { value: 'caffeine' }, 'Caffeine' )
                            , e( 'option', { value: 'fb-g' }, 'Facebook Gaming' )
                            , e( 'option', { value: 'steam' }, 'Steam' )
                            , e( 'option', { value: 'twitch' }, 'Twitch' )
                            , e( 'option', { value: 'xbox' }, 'XBOX Live' )
                            , e( 'option', { value: 'yt-l' }, 'YouTube Live' )
                        ])
                    ])
                    , e( 'div', { className: 'nine wide field' }, [
                        e( 'label', {}, 'Endpoint Handle' )
                        , e( 'input', { type: 'text', name: 'endpointHandle', defaultValue: ep.handle, onBlur: ( e ) => { this.handleEndpointHandleChange( e, idx ) } } )
                    ])
                    , e( 'div', { className: 'five wide field' }, [
                        e( 'label', {}, 'Tools' )
                        , e( 'button', { className: 'ui icon red button', onClick: ( e ) => { this.handleDeleteEndpointBtn( e, idx ) } }, [
                            e( 'i', { className: 'trash icon' } )
                        ])
                    ])
                ])
            )
        })

        return e( 'div', {}, [
            e( 'div', { className: `ui page dimmer ${ this.state.dimmer ? 'active' : '' }` } )
            , e( TopMenu, { page: 'profile', user: this.state.user, openSignUpModal: this.openSignUpModal, openLoginModal: this.openLoginModal } )
            , e( 'div', { className: 'ui segment' }, [
                e( 'div', { className: 'ui form' }, [
                    e( 'div', { className: 'inline field' }, [
                        e( 'label', {}, 'Extension' )
                        , e( 'select', { name: 'extensionEditing', defaultValue: this.state.extensionEditing, onChange: this.handleExtensionEditingChange }, editExtOpts )
                        , e( 'button', { className: 'ui right floated labeled icon green button', onClick: this.handleNewExtBtn }, [
                            e( 'i', { className: 'plus icon' } )
                            , 'Add Extension'
                        ])
                        , e( 'div', { className: `ui error message ${ this.state.extensionLoadingErr ? 'visible' : 'hidden' }` }, [
                            e( 'div', { className: 'header' }, 'Error loading extension!' )
                            , e( 'p', {}, this.state.extensionLoadingErr )
                        ])
                    ])
                ])
            ])
            , e( 'div', { className: `ui segment ${ this.state.extensionLoading ? 'loading' : '' } ${ this.state.extensionEditing ? '' : 'disabled' }` }, [
                e( 'div', { className: `ui info message ${ this.state.offMsg ? 'visible' : 'hidden' }` }, [
                    e( 'div', { className: 'header' }, 'Looks like nothing is selected.' )
                    , e( 'p', {}, [
                        'That\'s ok! When no redirect options are selected, your extension will redirect to the '
                        , e( 'a', { href: 'https://dir.gg', target: '_blank' }, 'https://dir.gg' )
                        , ' homepage. Nothing about you will be publicly available.'
                    ])
                ])
                , e( 'div', { className: 'div' }, [
                    e( 'div', { className: 'ui toggle checkbox', onClick: ( e ) => this.handleRedirectType( e, 'redirect' ) }, [
                        e( 'input', { className: 'hidden', tabIndex: 0, name: 'redirect', checked: this.state.isRedirect, type: 'checkbox' } )
                        , e( 'label', {}, 'Redirect' )
                    ])
                    , e( 'div', { className: 'ui segment' }, [
                        e( 'div', { className: 'ui form' }, [
                            e( 'div', { className: `field ${ this.state.isRedirect ? '' : 'disabled' }` }, [
                                e( 'label', {}, 'Redirect Link' )
                                , e( 'input', { type: 'text', name: 'redirectLink', value: this.state.redirectLink, onChange: this.handleRedirectLinkChange } )
                            ])
                            , e( 'div', { className: `ui success message ${ this.state.redirectMsg ? this.state.redirectMsg : '' }` }, [
                                e( 'div', { className: 'header' }, 'Everything looks good!' )
                                , e( 'p', {}, this.state.redirectMsg )
                            ])
                            , e( 'div', { className: `ui error message ${ this.state.redirectErr ? this.state.redirectErr : '' }` }, [
                                e( 'div', { className: 'header' }, 'Uh oh! Something went wrong :(' )
                                , e( 'p', {}, this.state.redirectErr )
                            ])
                        ])
                    ])
                ])
                , e( 'div', { className: 'ui horizontal divider' }, 'OR' )
                , e( 'div', { className: 'div' }, [
                    e( 'div', { className: 'ui toggle checkbox', onClick: ( e ) => this.handleRedirectType( e, 'splash' ) }, [
                        e( 'input', { className: 'hidden', tabIndex: 0, name: 'splash', checked: this.state.isSplash, type: 'checkbox' } )
                        , e( 'label', {}, 'Splash Page' )
                    ])
                    , e( 'div', { className: 'ui segment' }, [
                        e( 'div', { className: 'ui form' }, [
                            e( 'div', { className: `field ${ this.state.isSplash ? '' : 'disabled' }` }, [
                                e( 'label', {}, 'Splash Message' )
                                , e( 'input', { type: 'text', name: 'splashText', value: this.state.splashText, onChange: this.handleSplashTextChange } )
                            ])
                            , e( 'div', { className: `ui success message ${ this.state.splashMsg ? this.state.splashMsg : '' }` }, [
                                e( 'div', { className: 'header' }, 'Everything looks good!' )
                                , e( 'p', {}, this.state.splashMsg )
                            ])
                            , e( 'div', { className: `ui error message ${ this.state.splashErr ? this.state.splashErr : '' }` }, [
                                e( 'div', { className: 'header' }, 'Uh oh! Something went wrong :(' )
                                , e( 'p', {}, this.state.splashErr )
                            ])
                        ])
                    ])
                ])
                , e( 'div', { className: 'ui horizontal divider' }, 'OR' )
                , e( 'div', { className: 'div' }, [
                    e( 'div', { className: 'ui toggle checkbox', onClick: ( e ) => this.handleRedirectType( e, 'endpoint' ) }, [
                        e( 'input', { className: 'hidden', tabIndex: 0, name: 'endpoint', checked: this.state.isEndpoint, type: 'checkbox' } )
                        , e( 'label', {}, 'Known Endpoint' )
                    ])
                    , e( 'div', { className: 'ui segment' }, [
                        e( 'div', { className: 'ui form' }, [
                            endpointForms,
                            , e( 'button', { className: `ui labeled icon secondary button ${ this.state.isEndpoint ? '' : 'disabled' }`, onClick: this.handleAddEndpointBtn }, [
                                e( 'i', { className: 'plus icon' } )
                                , 'Add Endpoint'
                            ])
                            , e( 'div', { className: `ui success message ${ this.state.endpointMsg ? this.state.endpointMsg : '' }` }, [
                                e( 'div', { className: 'header' }, 'Everything looks good!' )
                                , e( 'p', {}, this.state.endpointMsg )
                            ])
                            , e( 'div', { className: `ui error message ${ this.state.endpointErr ? this.state.endpointErr : '' }` }, [
                                e( 'div', { className: 'header' }, 'Uh oh! Something went wrong :(' )
                                , e( 'p', {}, this.state.endpointErr )
                            ])
                        ])
                    ])
                ])
            ])
            , e( 'div', { className: 'ui segment' }, [
                e( 'div', { className: 'ui form' }, [
                    e( 'div', { className: 'field' }, [
                        , e( 'button', { className: 'ui labeled icon primary button', onClick: this.handleExtensionSaveBtn }, [
                            e( 'i', { className: 'save icon' } )
                            , 'Save Extension'
                        ])
                        , e( 'button', { className: 'ui button', onClick: this.handleExtensionCancelBtn }, 'Cancel' )
                        , e( 'div', { className: `ui error message ${ this.state.extensionSaveErr ? 'visible' : 'hidden' }` }, [
                            e( 'div', { className: 'header' }, 'Error saving extension!' )
                            , e( 'p', {}, this.state.extensionSaveErr )
                        ])
                        , e( 'div', { className: `ui success message ${ this.state.extensionSaveSuccessMsg ? 'visible' : 'hidden' }` }, [
                            e( 'div', { className: 'header' }, 'Extension successfully saved!' )
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


ReactDOM.render( e( ProfilePage ), document.getElementById( 'root' ) )
