class Footer extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {}
    }

    render() {
        let logoutLink

        if ( this.props.user ) {
            logoutLink = e( 'a', { className: 'item', href: '/logout' }, 'Log out' )
        }

        return e( 'div', { className: 'ui inverted vertical footer segment' }, [
            e( 'div', { className: 'ui container' }, [
                e( 'div', { className: 'ui stackable inverted divided equal height stackable grid' }, [
                    e( 'div', { className: 'three wide column' }, [
                        e( 'div', { className: 'ui inverted link list' }, [
                            e( 'a', { className: 'item', href: '/about' }, 'About' )
                            , e( 'a', { className: 'item', href: '/technical' }, 'Technical Details' )
                            , e( 'a', { className: 'item', href: '/policy' }, 'Extension Policy' )
                            , logoutLink
                        ])
                    ])
                    , e( 'div', { className: 'seven wide column' }, [
                        e( 'h4', { className: 'ui inverted header' }, [
                            'A '
                            , e( 'a', { href: 'https://universesgames.com', target: '_blank' }, 'Universes Games' )
                            , ' project.'
                        ])
                        , e( 'p', {}, 'Check us out for other fun projects or contract us to build your own idea!' )
                    ])
                ])
            ])
        ])
    }
}
