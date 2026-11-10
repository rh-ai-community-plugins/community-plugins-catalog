{{/*
Target namespace for all namespaced resources.
*/}}
{{- define "community-plugins-catalog.namespace" -}}
{{- .Values.namespace | default .Release.Namespace }}
{{- end }}

{{/*
Expand the name of the chart.
*/}}
{{- define "community-plugins-catalog.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "community-plugins-catalog.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "community-plugins-catalog.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "community-plugins-catalog.labels" -}}
helm.sh/chart: {{ include "community-plugins-catalog.chart" . }}
{{ include "community-plugins-catalog.selectorLabels" . }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "community-plugins-catalog.selectorLabels" -}}
app.kubernetes.io/name: {{ include "community-plugins-catalog.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "community-plugins-catalog.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "community-plugins-catalog.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create the name of the BFF service account to use
*/}}
{{- define "community-plugins-catalog.bffServiceAccountName" -}}
{{- if .Values.bff.serviceAccount.create }}
{{- default (printf "%s-bff" (include "community-plugins-catalog.fullname" .)) .Values.bff.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.bff.serviceAccount.name }}
{{- end }}
{{- end }}
