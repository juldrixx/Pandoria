import React from 'react';
import { APP_NAME, APP_SEPARATOR } from "../constants";

export function title(pageName) {
  return <title>{ `${APP_NAME} ${APP_SEPARATOR} ${pageName}` }</title>
}