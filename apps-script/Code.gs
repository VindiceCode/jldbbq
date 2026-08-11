/**
 * Just Like Dad's Barbecue — booking intake.
 *
 * Bind this to the Bookings spreadsheet, then:
 *   Deploy > New deployment > Web app
 *   Execute as: Me      Who has access: Anyone
 *
 * Editing this file does NOT update the live URL. You must publish a NEW
 * deployment version every time, or the endpoint keeps serving old code.
 */

var SHEET_NAME = 'Bookings';
var NOTIFY_EMAIL = 'sandybagger1@gmail.com';
var BUNDLE_PRICE = 200;
var MIN_FILL_MS = 3000;

var HEADERS = [
  'Submitted', 'Name', 'Phone', 'Email', 'Order type', 'Trays', 'Order value',
  'Occasion', 'Event date', 'Headcount', 'Customer notes', 'Marketing consent',
  'Consent timestamp', 'Consent wording', 'Paid', "Dad's notes", 'Source'
];

function doPost(e) {
  try {
    var p = JSON.parse(e.postData.contents);

    // Spam gates. Always answer ok:true so a bot never learns it was caught.
    if (p.company) return ok_();
    if (typeof p.elapsedMs === 'number' && p.elapsedMs < MIN_FILL_MS) return ok_();

    // Server-side validation. Client checks are UX, never a gate.
    var phoneDigits = String(p.phone || '').replace(/\D/g, '');
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(p.email || ''));
    if (!String(p.name || '').trim() || phoneDigits.length !== 10 || !emailOk) return ok_();

    var now = new Date();
    var trays = p.orderType === 'bundle' ? Number(p.trays || 1) : '';
    var value = p.orderType === 'bundle' ? BUNDLE_PRICE * Number(p.trays || 1) : '';

    var row = [
      now,
      p.name, p.phone, p.email,
      p.orderType === 'bundle' ? 'Bundle' : 'Custom',
      trays, value,
      p.occasion || '', p.eventDate || '', p.headcount || '', p.notes || '',
      p.consent ? true : false,
      p.consent ? now : '',
      p.consent ? (p.consentWording || '') : '',
      false, '',
      p.source || 'direct'
    ];

    // Two people submitting at once must not land on the same row.
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    var rowNumber;
    try {
      var sheet = getSheet_();
      sheet.appendRow(row);
      rowNumber = sheet.getLastRow();
      sheet.getRange(rowNumber, 15).insertCheckboxes();
    } finally {
      lock.releaseLock();
    }

    notify_(p, value, rowNumber);
    return ok_();
  } catch (err) {
    console.error(err);
    return json_({ ok: false });
  }
}

function doGet() {
  return json_({ ok: true, service: "Just Like Dad's booking intake" });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify_(p, value, rowNumber) {
  var firstName = String(p.name || '').split(' ')[0];
  var lastInitial = String(p.name || '').split(' ').slice(1, 2).join('').charAt(0);
  var who = lastInitial ? firstName + ' ' + lastInitial + '.' : firstName;

  var order = p.orderType === 'bundle'
    ? 'Bundle x' + (p.trays || 1) + ' ($' + value + ')'
    : 'Custom quote';

  var subject = 'New booking — ' + who + ' — ' + order +
    (p.eventDate ? ' — ' + p.eventDate : '');

  var sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl() + '#gid=' +
    getSheet_().getSheetId() + '&range=A' + rowNumber;

  var rows = [
    ['Name', p.name],
    ['Phone', p.phone],
    ['Email', p.email],
    ['Order', order],
    ['Occasion', p.occasion || '—'],
    ['Event date', p.eventDate || '—'],
    ['Headcount', p.headcount || '—'],
    ['Marketing ok', p.consent ? 'Yes' : 'No'],
    ['Came from', p.source || 'direct']
  ];

  var table = rows.map(function (r) {
    return '<tr>' +
      '<td style="padding:4px 14px 4px 0;color:#6B635A;font-size:12px;' +
      'text-transform:uppercase;letter-spacing:.08em;white-space:nowrap">' + r[0] + '</td>' +
      '<td style="padding:4px 0;color:#191512;font-size:15px">' + escape_(r[1]) + '</td>' +
      '</tr>';
  }).join('');

  var tel = String(p.phone || '').replace(/\D/g, '');

  var html =
    '<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px">' +
    '<p style="font-size:20px;font-weight:700;color:#7B241C;margin:0 0 4px">New booking request</p>' +
    '<p style="margin:0 0 18px;color:#6B635A;font-size:14px">Call them back within 24 hours.</p>' +
    '<p style="margin:0 0 18px">' +
    '<a href="tel:' + tel + '" style="background:#7B241C;color:#F5F0E4;text-decoration:none;' +
    'padding:12px 20px;border-radius:3px;font-weight:700;display:inline-block">Call ' + escape_(p.phone) + '</a>' +
    '&nbsp;&nbsp;<a href="mailto:' + escape_(p.email) + '" style="color:#7B241C;font-weight:600">Email</a>' +
    '</p>' +
    '<table cellpadding="0" cellspacing="0">' + table + '</table>' +
    (p.notes ? '<p style="margin:16px 0 0;padding:12px;background:#F5F1E8;border-left:3px solid #C4622D;' +
      'font-size:14px;color:#3A322A"><strong>They wrote:</strong><br>' + escape_(p.notes) + '</p>' : '') +
    '<p style="margin:20px 0 0;font-size:13px"><a href="' + sheetUrl + '" style="color:#6B635A">Open row ' + rowNumber + ' in the sheet</a></p>' +
    '</div>';

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: p.email,
    subject: subject,
    htmlBody: html,
    body: subject + '\n\n' + rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n')
  });
}

function escape_(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function ok_() { return json_({ ok: true }); }

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor to create the sheet and headers. */
function setup() {
  getSheet_();
  Logger.log('Sheet ready: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl());
}
