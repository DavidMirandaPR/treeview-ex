import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
export default class App extends React.Component {
  constructor() {
    super(...arguments);
    // Hierarchical data source for TreeView component
    this.treeObj = null;
    this.fields = {
      dataSource: new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
      }),
      query: new Query()
        .from('Employees')
        .select('EmployeeID,FirstName,Title')
        .take(5),
      id: 'EmployeeID',
      text: 'FirstName',
      hasChildren: 'EmployeeID',
      child: {
        dataSource: new DataManager({
          url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
          adaptor: new ODataV4Adaptor(),
          crossDomain: true,
        }),
        query: new Query()
          .from('Orders')
          .select('OrderID,EmployeeID,ShipName')
          .take(5),
        id: 'OrderID',
        parentID: 'EmployeeID',
        text: 'ShipName',
      },
    };
    this.cssClass = 'mytree';
  }
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <button
            onClick={() => {
              this.treeObj.refresh();
            }}
            className="btn btn-primary"
          >
            Refresh
          </button>
          <div className="control_wrapper">
            <TreeViewComponent
              fields={this.fields}
              cssClass={this.cssClass}
              ref={(ref) => {
                this.treeObj = ref;
              }}
            />
            <div className="details">
              <label>Note:</label>
              <div>
                <b>
                  1. The font-weight "Bold" is applied for all the leaf nodes
                </b>
              </div>
              <div>
                <i>
                  2. The font-weight "Italic" is applied for first level nodes
                </i>
              </div>
              <div>
                3. The color "darkmagenta" is applied for second level nodes
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('sample'));
