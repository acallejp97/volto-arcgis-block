import React, { createRef } from 'react';
import './css/ArcgisMap.css';
import classNames from 'classnames';
import { loadModules, loadCss } from 'esri-loader';

var Map, MapView, Zoom;

class UseCasesMapViewer extends React.Component {
  /**
   * This method does the creation of the main component
   * @param {*} props
   */
  constructor(props) {
    super(props);
    console.log(props);
    console.log(this.props);
    //we create a reference to the DOM element that will
    //be later mounted. We will use the reference that we
    //create here to reference the DOM element from javascript
    //code, for example, to create later a MapView component
    //that will use the map div to show the map
    this.mapdiv = createRef();
    this.mapCfg = props.cfg.Map;
    this.compCfg = this.props.cfg.Components;
    this.url = this.props.cfg.url;
    this.map = null;
    this.id = props.id;
    this.mapClass = classNames('map-container', {
      [`${props.customClass}`]: props.customClass || null,
    });
  }

  loader() {
    return loadModules([
      'esri/WebMap',
      'esri/views/MapView',
      'esri/widgets/Zoom',
    ]).then(([_Map, _MapView, _Zoom]) => {
      [Map, MapView, Zoom] = [_Map, _MapView, _Zoom];
    });
  }

  /**
   * Once the component has been mounted in the screen, this method
   * will be executed, so we can access to the DOM elements, since
   * they are already mounted
   */
  async componentDidMount() {
    loadCss();
    await this.loader();
    // this.mapdiv.current is the reference to the current DOM element of
    // this.mapdiv after it was mounted by the render() method
    this.map = new Map({
      basemap: 'topo',
    });

    this.view = new MapView({
      container: this.mapdiv.current,
      map: this.map,
      center: this.mapCfg.center,
      zoom: this.mapCfg.zoom,
      ui: {
        components: ['attribution'],
      },
    });
    this.zoom = new Zoom({
      view: this.view,
    });
    this.view.ui.add(this.zoom, {
      position: 'top-right',
    });

    //Once we have created the MapView, we need to ensure that the map div
    //is refreshed in order to show the map on it. To do so, we need to
    //trigger the renderization again, and to trigger the renderization
    //we invoke the setState method, that changes the state and forces a
    //react component to render itself again
    this.setState({});
  }

  /**
   * This method renders the map viewer, invoking if necessary the methods
   * to render the other widgets to display
   * @returns jsx
   */
  render() {
    // we use a reference (ref={this.mapdiv}) in order to reference a
    // DOM element to be mounted (but not yet mounted)
    return (
      <div>
        <div className="ccl-container">
          <div className="use-cases-block">
            <h1>See use cases by product</h1>
          </div>
        </div>
        <br/>
        <div className="ccl-container ccl-container-flex">
          <div className="use-cases-products-block cont-w-50">
            <div className="use-cases-products-title">
              <span>x </span>
              use cases
            </div>
            <div className="use-cases-products-list">

                <div key="{index}" className="use-cases-dropdown">
                  <div
                    className="ccl-expandable__button"
                    aria-expanded="expanded.includes(productToken)"
                    onClick=""
                    onKeyDown=""
                    role="button"
                    tabIndex="0"
                  >
                    productGroups[productToken].title
                  </div>
                  <div className="use-cases-element-container">

                        <div key="{index}" className="use-cases-element">
                          <div className="use-case-element-title">
                            useCase.title
                          </div>
                          <div className="use-case-element-description">
                            <span>
                            useCase.topics.map((topic)  topic.title)
                            </span>
                            <span>
                              new Date
                                useCase?.effective,
                               .toLocaleDateString
                            </span>
                            <span>useCase.responsibleOrganization</span>
                          </div>
                        </div>

                  </div>
                </div>

            </div>
          </div>

          <div className="use-cases-products-block cont-w-50">
            <div className="use-cases-products-title">
              Organisation locations
            </div>
            <div className={this.mapClass}>
              <div ref={this.mapdiv} className="map"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UseCasesMapViewer;
