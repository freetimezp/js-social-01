import React from 'react';

import {NextPage} from "next";

interface IProps {
    text: string,
}

const NoResults: NextPage<IProps> = ({text}) => {
    return (
        <div>

        </div>
    );
}

export default NoResults;