import React from "react";
import { NextResponse } from "next/server";
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TemplateSection = {
  title: string;
  description?: string;
  items?: string[];
};

type PdfPayload = {
  faith: string;
  faithLabel?: string;
  templateId?: string;
  templateName?: string;
  templateSummary?: string;
  title: string;
  readings?: string;
  music?: string;
  eulogies?: string;
  notes?: string;
  structure?: TemplateSection[];
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  heading: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 700,
  },
  subheading: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 600,
  },
  meta: {
    fontSize: 11,
    marginBottom: 3,
  },
  section: {
    marginTop: 14,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 600,
  },
  text: {
    fontSize: 11,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 2,
  },
});

function renderList(text?: string) {
  if (!text) {
    return <Text style={styles.text}>-</Text>;
  }

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return <Text style={styles.text}>-</Text>;
  }

  return (
    <View>
      {lines.map((line, index) => (
        <Text key={`${line}-${index}`} style={styles.listItem}>
          - {line}
        </Text>
      ))}
    </View>
  );
}

type OrderDocumentProps = {
  faith: string;
  faithLabel?: string;
  templateName?: string;
  templateSummary?: string;
  title: string;
  readings?: string;
  music?: string;
  eulogies?: string;
  notes?: string;
  structure: TemplateSection[];
};

function OrderDocument({
  faith,
  faithLabel,
  templateName,
  templateSummary,
  title,
  readings,
  music,
  eulogies,
  notes,
  structure,
}: OrderDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.meta}>Faith tradition: {faithLabel ?? faith}</Text>
        {templateName ? <Text style={styles.meta}>Template: {templateName}</Text> : null}
        {templateSummary ? <Text style={styles.meta}>Summary: {templateSummary}</Text> : null}

        {structure.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Ceremony flow</Text>
            {structure.map((section, index) => (
              <View key={`${section.title}-${index}`} style={{ marginBottom: 8 }}>
                <Text style={styles.subheading}>{section.title}</Text>
                {section.description ? <Text style={styles.text}>{section.description}</Text> : null}
                {section.items && section.items.length > 0 ? (
                  <View>
                    {section.items.map((item, itemIndex) => (
                      <Text key={`${item}-${itemIndex}`} style={styles.listItem}>
                        - {item}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.label}>Readings and scripture</Text>
          {renderList(readings)}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Music, hymns, and chants</Text>
          {renderList(music)}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tributes and eulogies</Text>
          {renderList(eulogies)}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Additional notes</Text>
          {notes ? <Text style={styles.text}>{notes}</Text> : <Text style={styles.text}>-</Text>}
        </View>
      </Page>
    </Document>
  );
}

export async function POST(request: Request) {
  let payload: PdfPayload;

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch (error) {
    console.error("Failed to read request body for order-of-service PDF", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    payload = JSON.parse(rawBody) as PdfPayload;
  } catch (error) {
    console.error("Failed to parse order-of-service PDF payload", error, rawBody);
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload || !payload.title || !payload.title.trim() || !payload.faith) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const structure = Array.isArray(payload.structure)
    ? payload.structure.map((section) => ({
        title: section?.title ?? "Untitled section",
        description: section?.description ?? undefined,
        items: Array.isArray(section?.items)
          ? section.items.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
          : undefined,
      }))
    : [];

  let pdfBuffer: Uint8Array;
  try {
    pdfBuffer = await renderToBuffer(
      <OrderDocument
        faith={payload.faith}
        faithLabel={payload.faithLabel}
        templateName={payload.templateName}
        templateSummary={payload.templateSummary}
        title={payload.title.trim()}
        readings={payload.readings?.trim()}
        music={payload.music?.trim()}
        eulogies={payload.eulogies?.trim()}
        notes={payload.notes?.trim()}
        structure={structure}
      />
    );
  } catch (error) {
    console.error("Failed to render order-of-service PDF", error);
    return NextResponse.json({ error: "pdf_generation_failed" }, { status: 500 });
  }

  const body = Buffer.from(pdfBuffer);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=order-of-service.pdf",
      "Content-Length": String(body.length),
    },
  });
}





