import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../resources/colors";
import { getDataFromFirestore } from "../helpers/fireStore";
import { formatTime } from "../helpers/formatTime";
import { LapContext } from "../context/context";

export interface Lap {
  end_point: Point;
  init_point: Point;
  lapTime: number;
}

export interface Point {
  accuracy: number;
  lat: number;
  lon: number;
  timestamp: number;
}

export function HistoryList() {
  const { laps } = useContext(LapContext)

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial</Text>
      <ScrollView style={styles.scroll} contentContainerStyle={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>Fecha</Text>
            <Text style={styles.cell}>Tiempo</Text>
          </View>
          {
            laps.map((item, index) => (
              <View style={styles.row} key={index}>
                <Text style={styles.cell}>{formatDate(item.end_point.timestamp)}</Text>
                <Text style={styles.cell}>{formatTime(item.lapTime / 1000)}</Text>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  container: {
    display: "flex",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 30,
  },
  header: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  table: {
    width: "90%",
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    textAlign: "center",
  },
  btnContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  horizontalLine: {
    height: 1,
    width: "85%",
    backgroundColor: colors.grayAlmostBlack,
    marginTop: 30,
  },
});
