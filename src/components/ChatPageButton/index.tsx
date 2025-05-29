import React from 'react';
import {useLocation} from '@docusaurus/router';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from '@radix-ui/react-dropdown-menu';
import styles from "./styles.module.css";
import clsx from "clsx";
import BrowserOnly from "@docusaurus/BrowserOnly";

const IconSize = "20"

const ExternalLinkArrow = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="lucide lucide-arrow-up-right w-3 h-3 text-gray-600 dark:text-gray-400 shrink-0">
    <path d="M7 7h10v10"></path>
    <path d="M7 17 17 7"></path>
</svg>

const AiIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.85113 3 4 5.73396 4 10C4 11.5704 4.38842 12.7289 5.08252 13.6554C5.79003 14.5998 6.87746 15.3863 8.41627 16.0908L9.2326 16.4645L8.94868 17.3162C8.54129 18.5384 7.84997 19.6611 7.15156 20.5844C9.56467 19.8263 12.7167 18.6537 14.9453 17.1679C17.1551 15.6948 18.3969 14.5353 19.0991 13.455C19.7758 12.4139 20 11.371 20 10C20 5.73396 16.1489 3 12 3ZM2 10C2 4.26604 7.14887 1 12 1C16.8511 1 22 4.26604 22 10C22 11.629 21.7242 13.0861 20.7759 14.545C19.8531 15.9647 18.3449 17.3052 16.0547 18.8321C13.0781 20.8164 8.76589 22.2232 6.29772 22.9281C5.48665 23.1597 4.84055 22.6838 4.56243 22.1881C4.28848 21.6998 4.22087 20.9454 4.74413 20.3614C5.44439 19.5798 6.21203 18.5732 6.72616 17.4871C5.40034 16.7841 4.29326 15.9376 3.48189 14.8545C2.48785 13.5277 2 11.9296 2 10Z" fill="#0F0F0F"/>
</svg>

const CopyIcon = <svg xmlns="http://www.w3.org/2000/svg" width={IconSize} height={IconSize} viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      className="lucide lucide-copy-icon lucide-copy">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
</svg>

const MarkdownIcon = <svg width={IconSize} height={IconSize} viewBox="0 0 24 24" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd"
          d="M0 8C0 5.79086 1.79086 4 4 4H20C22.2091 4 24 5.79086 24 8V16C24 18.2091 22.2091 20 20 20H4C1.79086 20 0 18.2091 0 16V8ZM4 6C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6H4ZM5.68377 8.05132C6.09211 7.9152 6.54174 8.05566 6.8 8.4L9 11.3333L11.2 8.4C11.4583 8.05566 11.9079 7.9152 12.3162 8.05132C12.7246 8.18743 13 8.56957 13 9V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V12L9.8 13.6C9.61115 13.8518 9.31476 14 9 14C8.68524 14 8.38885 13.8518 8.2 13.6L7 12V15C7 15.5523 6.55228 16 6 16C5.44772 16 5 15.5523 5 15V9C5 8.56957 5.27543 8.18743 5.68377 8.05132ZM18 9C18 8.44772 17.5523 8 17 8C16.4477 8 16 8.44772 16 9V12.5858L15.7071 12.2929C15.3166 11.9024 14.6834 11.9024 14.2929 12.2929C13.9024 12.6834 13.9024 13.3166 14.2929 13.7071L16.2929 15.7071C16.6834 16.0976 17.3166 16.0976 17.7071 15.7071L19.7071 13.7071C20.0976 13.3166 20.0976 12.6834 19.7071 12.2929C19.3166 11.9024 18.6834 11.9024 18.2929 12.2929L18 12.5858V9Z"
          fill="#000000"/>
</svg>

const ChatGptIcon = <svg width={IconSize} height={IconSize} fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5"
         className="h-6 w-6" viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386">
        <text x="-9999" y="-9999">ChatGPT</text>
        <path
            d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
            fill="currentColor"/>
    </svg>

const ClaudeIcon = <svg fill="currentColor" fill-rule="evenodd" height={IconSize} width={IconSize} viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"><title>Claude</title>
    <path
        d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"></path>
</svg>

function getQuery(currentUrl){
    const query = `Read this page of the Restate documentation ${currentUrl}.md so I can ask questions about it.`;
    return encodeURIComponent(query)
}

function getChatGptUrl(currentUrl){
    return `https://chatgpt.com/?hints=search&q=${getQuery(currentUrl)}`
}

function getClaudeUrl(currentUrl){
    return `https://claude.ai/new?q=${getQuery(currentUrl)}`;
}

async function handleCopyMarkdown(url)  {
    try {
        const response = await fetch(url + '.md');
        const text = await response.text();
        await navigator.clipboard.writeText(text);
        alert('Markdown copied to clipboard!');
    } catch (err) {
        alert('Failed to copy markdown.');
        console.error(err);
    }
}

const ChatPageButton = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    const ignoredPages = ['/', '/guides', '/develop/', '/operate/']

    const ignoreCurrentPage = ignoredPages.includes(currentUrl) ||
        currentUrl.includes('/category') ||
        currentUrl.includes('/adminapi')

    if (ignoreCurrentPage){
        return <></>
    } else {
        return (
            <BrowserOnly>
                {() =>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <DropdownMenu>
                            <DropdownMenuTrigger className={styles.dropdownTrigger}>
                                <div>
                                    <div className={clsx(styles.child, styles.listIcon)}>{AiIcon}</div>
                                    <div className={styles.child}>
                                        Chat with page
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={styles.dropdownContent}>
                                <DropdownMenuItem className={styles.dropdownItem}>
                                    <a className={styles.dropdownLink} href={getChatGptUrl(window.location.href)} target="_blank" rel="noopener noreferrer">
                                        <div className={clsx(styles.child, styles.listIcon)}>{ChatGptIcon}</div>
                                        <div className={styles.child}>
                                            Open in ChatGPT
                                            {ExternalLinkArrow}
                                            <br/>
                                            <small>Ask questions about this page</small>
                                        </div>
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a className={styles.dropdownLink} href={getClaudeUrl(window.location.href)} target="_blank" rel="noopener noreferrer">
                                        <div className={clsx(styles.child, styles.listIcon)}>{ClaudeIcon}</div>
                                        <div className={styles.child}>
                                            Open in Claude
                                            {ExternalLinkArrow}
                                            <br/>
                                            <small>Ask questions about this page</small>
                                        </div>
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleCopyMarkdown(window.location.href)}>
                                    <a className={styles.dropdownLink}>
                                        <div className={clsx(styles.child, styles.listIcon)}>{CopyIcon}</div>
                                        <div className={styles.child}>
                                            Copy page as Markdown
                                            <br/>
                                            <small>Copy page as input for LLMs</small>
                                        </div>
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a className={styles.dropdownLink} href={window.location.href + '.md'} target="_blank" rel="noopener noreferrer">
                                        <div className={clsx(styles.child, styles.listIcon)}>{MarkdownIcon}</div>
                                        <div className={styles.child}>
                                            View as Markdown
                                            {ExternalLinkArrow}
                                            <br/>
                                            <small>View page as plain text</small>
                                        </div>
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                }
            </BrowserOnly>
        );
    }
};

export default ChatPageButton;
