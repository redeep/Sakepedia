import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// material-ui
import AutoComplete from 'material-ui/AutoComplete'
import FontIcon from 'material-ui/FontIcon'
import List from './List'
import {Tabs, Tab} from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'
// actions
import { getSakeList, getNames, getBreweries, getPrefectures } from '../actions'

class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    getNames( this.props.dispatch )
    getBreweries( this.props.dispatch )
    getPrefectures( this.props.dispatch )
  }

  detailSearch() {
    this.search( this.props.dispatch, {
      prefecture: document.getElementById('prefecture').value,
      brewrey: document.getElementById('brewrey').value,
      name: document.getElementById('name').value
    }  )
  }

  search( dispatch, query ) {
    getSakeList( dispatch, query )
  }

  render() {
    const styles = {
      icon: {
        color: 'gray',
      },
      tabItemContainer: {
        'backgroundColor': 'lightgray',
      },
    }
    return (
      <div>
        <Tabs tabItemContainerStyle={ styles.tabItemContainer } >
          <Tab label="銘柄検索" >
            <AutoComplete
              hintText={ <span><FontIcon className="material-icons" style={styles.icon}>search</FontIcon>銘柄</span> }
              dataSource={ this.props.names }
              fullWidth={true}
              onNewRequest={ ( name ) => { this.search( this.props.dispatch, { name } ) } }
            />
          </Tab>
          <Tab label="詳細検索" >
            <AutoComplete
              id="prefecture"
              hintText={ <span><FontIcon className="material-icons" style={styles.icon}>search</FontIcon>都道府県</span> }
              dataSource={ this.props.prefectures }
              fullWidth={true}
            />
            <AutoComplete
              id="brewrey"
              hintText={ <span><FontIcon className="material-icons" style={styles.icon}>search</FontIcon>蔵元</span> }
              dataSource={ this.props.breweries }
              fullWidth={true}
            />
            <AutoComplete
              id="name"
              hintText={ <span><FontIcon className="material-icons" style={styles.icon}>search</FontIcon>銘柄</span> }
              dataSource={ this.props.names }
              fullWidth={true}
            />
            <RaisedButton label="検索" primary={true} onClick={this.detailSearch.bind(this)} />
          </Tab>
        </Tabs>

        <List />
      </div>
    )
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  names: PropTypes.array.isRequired,
  breweries: PropTypes.array.isRequired,
  prefectures: PropTypes.array.isRequired,
}

const mapStateToProps = state => state
export default connect( mapStateToProps )( Search )
