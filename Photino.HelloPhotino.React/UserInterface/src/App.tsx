import React from "react";
import "./App.css";
import BranchSelector from "./components/BranchSelector";
import CommitCards from "./components/CommitCards";

const API_URL = `https://api.github.com/repos/tryphotino/photino.NET/commits?per_page=3&sha=`;

const branches = ["master", "debug"];

const App = () => {
    const [currentBranch, setCurrentBranch] = React.useState<
        string | undefined
    >();

    const [commits, setCommits] = React.useState<Array<string>>([]);

    const selectBranch = React.useCallback((branch: string) => {
        setCurrentBranch(branch);
        void fetchCommits(branch).then((f) => setCommits(f));
    }, []);

    React.useEffect(() => {
        selectBranch("master");
    }, [selectBranch]);

    return (
        <div id="content">
            <h1>Latest Photino.NET Commits</h1>
            <BranchSelector //
                options={branches}
                value={currentBranch}
                onChange={selectBranch}
            />
            <p>tryphotino/photino.NET @{currentBranch}</p>
            <CommitCards commits={commits} />
        </div>
    );
};

const fetchCommits = async (branch: string) => {
    const url = `${API_URL}${branch}`;
    return await (await fetch(url)).json();
};

export default App;
