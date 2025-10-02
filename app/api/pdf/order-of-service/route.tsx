import React from "react";
import { NextResponse } from "next/server";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 32 },
  heading: { fontSize: 18, marginBottom: 8 },
  section: { marginTop: 12 },
  label: { fontSize: 12, marginBottom: 2 },
  body: { fontSize: 11, lineHeight: 1.5 },
});

type OrderDocProps = {
  faith: string;
  title: string;
  readings: string;
  music: string;
  eulogies: string;
};

function OrderDocument({ faith, title, readings, music, eulogies }: OrderDocProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>{title}</Text>
        <Text>Tradition: {faith}</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Readings</Text>
          <Text style={styles.body}>{readings || "-"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Music / Hymns / Chants</Text>
          <Text style={styles.body}>{music || "-"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Eulogies / Tributes</Text>
          <Text style={styles.body}>{eulogies || "-"}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function POST(request: Request) {
  const form = await request.formData();
  const faith = String(form.get("faith") ?? "");
  const title = String(form.get("title") ?? "Order of Service");
  const readings = String(form.get("readings") ?? "");
  const music = String(form.get("music") ?? "");
  const eulogies = String(form.get("eulogies") ?? "");

  const pdfResult = await pdf(
    <OrderDocument faith={faith} title={title} readings={readings} music={music} eulogies={eulogies} />
  ).toBuffer();

  const pdfBytes = pdfResult as unknown as Uint8Array;
  const arrayBuffer = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength) as ArrayBuffer;

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=order-of-service.pdf",
    },
  });
}

