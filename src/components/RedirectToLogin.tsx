import React from 'react';

import { Constants } from 'central';

export default function RedirectToLogin() {
  window.location.href = `${Constants.central.root}/login?redirect=${encodeURIComponent(document.referrer)}`;
  return <div />;
}
