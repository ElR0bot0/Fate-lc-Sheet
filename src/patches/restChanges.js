export function restChanges(html){
    // Remove the Short Rest button
    html.find('button[data-action="shortRest"]').remove();

    // Rename Long Rest to just "Rest"
    let longRestButton = html.find('button[data-action="longRest"]');
    if (longRestButton.length) {
        longRestButton.text("Rest");
    }
}