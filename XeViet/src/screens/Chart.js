import React, {Component} from 'react';
import { BarChart, PieChart , Grid } from 'react-native-svg-charts';
import { Circle, G, Line , Text} from 'react-native-svg'
import {View} from 'react-native';

export default class App extends Component<Props>{
  render() {

      const data = [
          {
              key: 1,
              amount: 50,
              svg: { fill: '#600080' },
          },
          {
              key: 2,
              amount: 50,
              svg: { fill: '#9900cc' }
          },
          {
              key: 3,
              amount: 40,
              svg: { fill: '#c61aff' }
          },
          {
              key: 4,
              amount: 95,
              svg: { fill: '#d966ff' }
          },
          {
              key: 5,
              amount: 35,
              svg: { fill: '#ecb3ff' }
          }
      ]

      const Labels = ({ slices, height, width }) => {
          return slices.map((slice, index) => {
              const { labelCentroid, pieCentroid, data } = slice;
              return (
                  <Text
                      key={index}
                      x={pieCentroid[ 0 ]}
                      y={pieCentroid[ 1 ]}
                      fill={'white'}
                      textAnchor={'middle'}
                      alignmentBaseline={'middle'}
                      fontSize={24}
                      stroke={'black'}
                      strokeWidth={0.2}
                  >
                      {data.amount}
                  </Text>
              )
          })
      }

      return (
        <View>


          <PieChart
              style={{ height: 200 }}
              valueAccessor={({ item }) => item.amount}
              data={data}
              spacing={0}
              outerRadius={'95%'}
              innerRadius={'5%'}
          >
              <Labels/>
          </PieChart>

          </View>
      )
  }

}
