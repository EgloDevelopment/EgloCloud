class SignUpModal extends React.Component {
    constructor( props ) {
        super( props )

        this.handleExtensionChange = this.handleExtensionChange.bind( this )
        this.handleRegisterNextBtn = this.handleRegisterNextBtn.bind( this )

        this.state = {
            extensionAvailable: false
            , extensionPremium: false
            , extensionTaken: false
            , extension: ''
        }
    }

    handleExtensionChange( e ) {
        const val = e.target.value

        this.setState({
            extension: val
            , extensionPremium: val.length <= 4
            , extensionAvailable: true
        })
    }

    handleRegisterNextBtn( e ) {
        location.href = `/preregister/${ this.state.extension }`
    }

    render() {
        return e( 'div', { className: `ui modal ${ this.props.active ? 'active' : '' }` }, [
            e( 'i', { className: 'close icon', onClick: this.props.close } )
            , e( 'div', { className: 'header' }, 'Sign up!' )
            , e( 'div', { className: 'content' }, [
                e( 'div', { className: 'description' }, [
                    'Enter your desired dir.gg extension below to check for availabiity. Below are conditions for valid extensions:'
                    , e( 'ul', {}, [
                        e( 'li', {}, [
                            'Extensions are '
                            , e( 'em', {}, 'not' )
                            , ' case sensitive.'
                        ])
                        , e( 'li', {}, 'Extensions must be alphanumeric.' )
                        , e( 'li', {}, 'Extensions have a maximum of ten characters.' )
                        , e( 'li', {}, 'Extensions length four or less are premium and must be purchased.' )
                        , e( 'li', {}, [
                            'Extensions must pass profanity filter (more on that '
                            , e( 'a', { href: '/technical', target: '_blank' }, 'here' )
                            , ').'
                        ])
                        , e( 'li', {}, [
                            'Extensions are always subject to reporting (policy located '
                            , e( 'a', { href: '/policy', target: '_blank' }, 'here' )
                            , ').'
                        ])
                    ])
                ])
                , e( 'form', { className: 'ui form' }, [
                    e( 'div', { className: 'field' }, [
                        e( 'label', {}, 'Extension' )
                        , e( 'input', { type: 'text', autoFocus: true, name: 'extension', placeholder: 'Extension (eg. 001337)', value: this.state.extension, onChange: this.handleExtensionChange } )
                    ])
                    , e( 'div', { className: `ui success small attached message ${ this.state.extensionAvailable ? 'visible' : '' }` }, [
                        e( 'div', { className: 'header' }, 'The extension is available!' )
                        , e( 'p', {}, 'Continue to make this extension your own!' )
                    ])
                    , e( 'div', { className: `ui warning small attached message ${ this.state.extensionPremium ? 'visible' : '' }` }, [
                        e( 'div', { className: 'header' }, 'You picked a premium extension!' )
                        , e( 'p', {}, 'You may purchase this premium extension later in the checkout process.' )
                    ])
                    , e( 'div', { className: `ui error small attached message ${ this.state.extensionTaken ? 'visible' : '' }` }, [
                        e( 'div', { className: 'header' }, 'This extension is already in use :(' )
                        , e( 'p', {}, 'Please enter a new extension above to check for availability.' )
                    ])
                ])
            ])
            , e( 'div', { className: 'actions' }, [
                e( 'div', { className: 'ui button', onClick: this.props.close }, 'Cancel' )
                , e( 'div', { className: 'ui primary button', onClick: this.handleRegisterNextBtn }, [
                    'Next'
                    , e( 'i', { className: 'right arrow icon' } )
                ])
            ])
        ])
    }
}
