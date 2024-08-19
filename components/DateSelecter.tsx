import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export const DateSelecter: React.FC = () => {
  const dayOneMonthAgo = new Date();
  dayOneMonthAgo.setMonth(dayOneMonthAgo.getMonth() - 1);

  const [startDate, setStartDate] = useState(dayOneMonthAgo);
  const [endDate, setEndDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"start" | "end" | null>(null);

  const onChangeStart = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  const onChangeEnd = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Group 1: Start Date */}
      <View style={styles.group}>
        <Text style={styles.label}>Start Date</Text>
        <Button
          onPress={() => {
            setModalVisible(true);
            setModalType("start");
          }}
          title={startDate.toLocaleDateString()}
          color="#4CAF50"
        />
        {modalType === "start" && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="spinner"
                  onChange={onChangeStart}
                />
                <Button
                  title="Close"
                  onPress={() => setModalVisible(false)}
                  color="#4CAF50"
                />
              </View>
            </View>
          </Modal>
        )}
      </View>

      {/* Group 2: End Date */}
      <View style={styles.group}>
        <Text style={styles.label}>End Date</Text>
        <Button
          onPress={() => {
            setModalVisible(true);
            setModalType("end");
          }}
          title={endDate.toLocaleDateString()}
          color="#F44336"
        />
        {modalType === "end" && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="spinner"
                  onChange={onChangeEnd}
                />
                <Button
                  title="Close"
                  onPress={() => setModalVisible(false)}
                  color="#F44336"
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
  },
  group: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 5,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
});
