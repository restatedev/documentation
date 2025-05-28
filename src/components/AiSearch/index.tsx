import React from 'react';
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

const AiIcon = <svg width={IconSize} height={IconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M6.5 13L7.28446 14.5689C7.54995 15.0999 7.68269 15.3654 7.86003 15.5954C8.01739 15.7996 8.20041 15.9826 8.40455 16.14C8.63462 16.3173 8.9001 16.4501 9.43108 16.7155L11 17.5L9.43108 18.2845C8.9001 18.5499 8.63462 18.6827 8.40455 18.86C8.20041 19.0174 8.01739 19.2004 7.86003 19.4046C7.68269 19.6346 7.54995 19.9001 7.28446 20.4311L6.5 22L5.71554 20.4311C5.45005 19.9001 5.31731 19.6346 5.13997 19.4046C4.98261 19.2004 4.79959 19.0174 4.59545 18.86C4.36538 18.6827 4.0999 18.5499 3.56892 18.2845L2 17.5L3.56892 16.7155C4.0999 16.4501 4.36538 16.3173 4.59545 16.14C4.79959 15.9826 4.98261 15.7996 5.13997 15.5954C5.31731 15.3654 5.45005 15.0999 5.71554 14.5689L6.5 13Z"
        stroke="#00116b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path
        d="M15 2L16.1786 5.06442C16.4606 5.79765 16.6016 6.16426 16.8209 6.47264C17.0153 6.74595 17.254 6.98475 17.5274 7.17909C17.8357 7.39836 18.2024 7.53937 18.9356 7.82138L22 9L18.9356 10.1786C18.2024 10.4606 17.8357 10.6016 17.5274 10.8209C17.254 11.0153 17.0153 11.254 16.8209 11.5274C16.6016 11.8357 16.4606 12.2024 16.1786 12.9356L15 16L13.8214 12.9356C13.5394 12.2024 13.3984 11.8357 13.1791 11.5274C12.9847 11.254 12.746 11.0153 12.4726 10.8209C12.1643 10.6016 11.7976 10.4606 11.0644 10.1786L8 9L11.0644 7.82138C11.7976 7.53937 12.1643 7.39836 12.4726 7.17909C12.746 6.98475 12.9847 6.74595 13.1791 6.47264C13.3984 6.16426 13.5394 5.79765 13.8214 5.06442L15 2Z"
        stroke="#00116b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

const RobotIcon = <svg width={IconSize} height={IconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 15C8.44771 15 8 15.4477 8 16C8 16.5523 8.44771 17 9 17C9.55229 17 10 16.5523 10 16C10 15.4477 9.55229 15 9 15Z" fill="#0F0F0F"/>
    <path d="M14 16C14 15.4477 14.4477 15 15 15C15.5523 15 16 15.4477 16 16C16 16.5523 15.5523 17 15 17C14.4477 17 14 16.5523 14 16Z" fill="#0F0F0F"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C10.8954 1 10 1.89543 10 3C10 3.74028 10.4022 4.38663 11 4.73244V7H6C4.34315 7 3 8.34315 3 10V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V10C21 8.34315 19.6569 7 18 7H13V4.73244C13.5978 4.38663 14 3.74028 14 3C14 1.89543 13.1046 1 12 1ZM5 10C5 9.44772 5.44772 9 6 9H7.38197L8.82918 11.8944C9.16796 12.572 9.86049 13 10.618 13H13.382C14.1395 13 14.832 12.572 15.1708 11.8944L16.618 9H18C18.5523 9 19 9.44772 19 10V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V10ZM13.382 11L14.382 9H9.61803L10.618 11H13.382Z" fill="#0F0F0F"/>
    <path d="M1 14C0.447715 14 0 14.4477 0 15V17C0 17.5523 0.447715 18 1 18C1.55228 18 2 17.5523 2 17V15C2 14.4477 1.55228 14 1 14Z" fill="#0F0F0F"/>
    <path d="M22 15C22 14.4477 22.4477 14 23 14C23.5523 14 24 14.4477 24 15V17C24 17.5523 23.5523 18 23 18C22.4477 18 22 17.5523 22 17V15Z" fill="#0F0F0F"/>
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


function getLlmsUrl(host){
    return `${host}/llms.txt`
}

function getLlmsFullUrl(host){
    return `${host}/llms-full.txt`
}

function getQuery(host){
    const query = `Read the Restate Documentation ${getLlmsFullUrl(host)} and Restate Examples https://github.com/restatedev/examples so I can ask questions about Restate.`;
    return encodeURIComponent(query)
}

function getChatGptUrl(host){
    return `https://chatgpt.com/?hints=search&q=${getQuery(host)}`
}

function getClaudeUrl(host){
    return `https://claude.ai/new?q==${getQuery(host)}`;
}

const AskAiButton = () => {
    return (
        <BrowserOnly>
            {() =>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <DropdownMenu>
                        <DropdownMenuTrigger className={styles.dropdownTrigger}>
                            <div className={styles.aiSearchTrigger}>
                                <div className={clsx(styles.child, styles.listIcon)}>{AiIcon}</div>
                                <div className={styles.child}>
                                    Ask AI
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={styles.dropdownContent}>
                            <DropdownMenuItem className={styles.dropdownItem}>
                                <a className={styles.dropdownLink} href={getChatGptUrl(window.location.origin)} target="_blank">
                                    <div className={clsx(styles.child, styles.listIcon)}>{ChatGptIcon}</div>
                                    <div className={styles.child}>
                                        Open in ChatGPT
                                        {ExternalLinkArrow}
                                        <br/>
                                        <small>Ask questions about Restate</small>
                                    </div>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a className={styles.dropdownLink} href={getClaudeUrl(window.location.origin)} target="_blank">
                                    <div className={clsx(styles.child, styles.listIcon)}>{ClaudeIcon}</div>
                                    <div className={styles.child}>
                                        Open in Claude
                                        {ExternalLinkArrow}
                                        <br/>
                                        <small>Ask questions about Restate</small>
                                    </div>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a className={styles.dropdownLink} href={getLlmsUrl(window.location.origin)} target="_blank">
                                    <div className={clsx(styles.child, styles.listIcon)}>{RobotIcon}</div>
                                    <div className={styles.child}>
                                        View llms.txt
                                        <br/>
                                        <small>View docs index as LLM input</small>
                                    </div>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a className={styles.dropdownLink} href={getLlmsFullUrl(window.location.origin)} target="_blank">
                                    <div className={clsx(styles.child, styles.listIcon)}>{MarkdownIcon}</div>
                                    <div className={styles.child}>
                                        View llms-full.txt
                                        {ExternalLinkArrow}
                                        <br/>
                                        <small>View full docs as markdown</small>
                                    </div>
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            }
        </BrowserOnly>
    );
};

export default AskAiButton;
