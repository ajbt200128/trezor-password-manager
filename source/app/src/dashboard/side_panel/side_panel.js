"use strict";

var React = require('react'),
    Router = require('react-router'),
    DataService = require('../../components/data_service'),
    Context = {},
    SidePanel = React.createClass({

        getInitialState() {
            return {
                tags: {},
                active_id: 0,
                active_name: ''
            }
        },

        componentWillMount() {
            this.props.eventEmitter.on('contextInit', this.saveContext);
        },

        onClick(e) {
            this.props.eventEmitter.emit('changeTag', e);
            this.setState({
                active_id: parseInt(e),
                active_name: Context.getTagById(e)
            });
        },

        saveContext(context) {
            Context = context;
            this.setState({
                tags: Context.data.tags,
                active_name: Context.getTagById(this.state.active_id)
            });
        },

        render(){
            var tag_array = Object.keys(this.state.tags).map((key) => {
                var obj = this.state.tags[key];
                obj.active = this.state.active_name === obj.name ? 'active' : '';
                return (
                    <li key={key} className={obj.active}><a data-tag-key={key} data-tag-name={obj.name}
                                                            onClick={this.onClick.bind(null, key)}
                                                            onTouchStart={this.onClick.bind(null, key)}><i
                        className={"icon ion-" + obj.icon}></i> <span
                        className="nav-label">{obj.name}</span></a></li>)
            });


            return (
                <aside className="left-panel">
                    <div className="logo">
                        <a href="." className="logo-expanded">
                            <img src="dist/img/logo-mini.png" alt="logo"/>
                            <span className="nav-label"><b>KEEZOR</b></span>
                        </a>
                    </div>

                    <nav className="navigation">
                        <ul className="list-unstyled">
                            {tag_array}
                        </ul>
                    </nav>

                </aside>
            )
        }
    });

module.exports = SidePanel;
