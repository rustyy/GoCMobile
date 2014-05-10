//
//  gocViewController.m
//  GoCiOS
//
//  Created by Eugen Waldschmidt on 16.04.14.
//  Copyright (c) 2014 Zeotyn. All rights reserved.
//

#import "gocViewController.h"

@interface gocViewController ()

@end

@implementation gocViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        [self refreshPad:self];        // The device is an iPad running iOS 3.2 or later.
    } else {
        [self refreshPhone:self];        // The device is an iPhone or iPod touch.
    }

    
}

-(IBAction)refreshPhone:(id)sender {
    NSURL *url = [NSURL URLWithString:@"http://goc:goc_admin@phone.dev.gamesoncampus.de"];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [_webView loadRequest:request];
}

-(IBAction)refreshPad:(id)sender {
    NSURL *url = [NSURL URLWithString:@"http://goc:goc_admin@dev.gamesoncampus.de"];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [_webViewiPad loadRequest:request];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
