import React from 'react';
import { ScrollView } from 'react-native';
import LapRow from './lapRow';

interface LapsContainerProps {
    laps: number[];
};

const LapsContainer: React.FC<LapsContainerProps> = ({ laps }) => {
    return (
        <ScrollView>
            {
                laps.map((item, index) => {
                    return <LapRow index={index} lap={item} key={item + index} />
                })
            }
        </ScrollView>
    );
};

export default LapsContainer;