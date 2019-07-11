import React from "react";
import { State, FilteredData } from "./types";
import "./styles.scss";
import UserDetails from "./components/user-details/user-details.component";
interface Props {}

export default class FilterModule extends React.Component<Props> {
  state: State = {
    data: [],
    filtered_data: []
  };

  componentDidMount() {
    this.fetchMatches();
  }

  fetchMatches() {
    fetch("/api/v1/matches")
      .then(res => res.json())
      .then(res => this.setState({data: res.matches, filtered_data: res.matches }),
        (err) => {
          console.error(err);
        });
  }

render () {
    return (
        <main>
          <header></header>
          <aside></aside>
          <div className="results-wrapper">
                {this.state.filtered_data.map(match => {
                    return <UserDetails details={match}></UserDetails>;
                  })}
              </div>
        </main>
    );
  }
}