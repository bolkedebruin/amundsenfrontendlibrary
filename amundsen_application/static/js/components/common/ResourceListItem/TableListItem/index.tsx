import * as React from 'react';
import { Link } from 'react-router-dom';

import { LoggingParams, TableResource} from '../types';

export interface TableListItemProps {
  table: TableResource;
  logging: LoggingParams;
}

class TableListItem extends React.Component<TableListItemProps, {}> {
  constructor(props) {
    super(props);
  }

  getDateLabel = () => {
    const { table } = this.props;
    const dateTokens = new Date(table.last_updated_epoch * 1000).toDateString().split(' ');
    return `${dateTokens[1]} ${dateTokens[2]}, ${dateTokens[3]}`;
  };

  getLink = () => {
    const { table, logging } = this.props;
    return `/table_detail/${table.cluster}/${table.database}/${table.schema_name}/${table.name}`
      + `?index=${logging.index}&source=${logging.source}`;
  };

  render() {
    const { table } = this.props;
    const hasLastUpdated = !!table.last_updated_epoch;

    return (
      <li className="list-group-item">
        <Link className="resource-list-item table-list-item" to={ this.getLink() }>
          <img className="icon icon-database icon-color" />
          <div className="content">
            <div className={ hasLastUpdated? "col-sm-9 col-md-10" : "col-sm-12"}>
              <div id="main-title" className="subtitle-2 truncated">{ `${table.schema_name}.${table.name}`}</div>
              <div id="main-description" className="body-3 truncated">{ table.description }</div>
            </div>
            {/*<div className={ hasLastUpdated? "hidden-xs col-sm-3 col-md-4" : "hidden-xs col-sm-6"}>*/}
              {/*<div className="subtitle-3">Frequent Users</div>*/}
              {/*<div className="body-3 truncated">*/}
                {/*<label> </label>*/}
              {/*</div>*/}
            {/*</div>*/}
            {
              hasLastUpdated &&
              <div className="hidden-xs col-sm-3 col-md-2">
                <div id="secondary-title" className="subtitle-3">Latest Data</div>
                <div id="secondary-description" className="body-3 truncated">
                  { this.getDateLabel() }
                </div>
              </div>
            }
          </div>
          <img className="icon icon-right" />
        </Link>
      </li>
    );
  }
}

export default TableListItem;
